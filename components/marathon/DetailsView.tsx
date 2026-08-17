"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import StepProgress from "./StepProgress";
import PhotoUpload from "./PhotoUpload";
import { FieldLabel, FieldError, TextInput, PillGroup } from "./FormFields";
import {
  BLOOD_GROUPS,
  CATEGORY_LABELS,
  TSHIRT_SIZES,
  type Gender,
  type BloodGroup,
  type MarathonCategory,
  type TshirtSize,
} from "@/types/marathon";
import type {
  RegisterRequest,
  RegisterResponse,
  PhotoUploadResponse,
  ApiErrorResponse,
} from "@/types/marathon";

const GENDERS: Gender[] = ["Male", "Female", "Other", "Prefer not to say"];
const CATEGORIES: MarathonCategory[] = ["student", "public", "government_employee"];

export default function DetailsView() {
  const router = useRouter();
  const { draft, updateDraft, hydrated } = useMarathonRegistration();

  const [fullName, setFullName] = useState(draft.fullName);
  const [age, setAge] = useState(draft.age);
  const [gender, setGender] = useState<Gender | "">(draft.gender);
  const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">(draft.bloodGroup);
  const [phone, setPhone] = useState(draft.phone);
  const [city, setCity] = useState(draft.city);
  const [category, setCategory] = useState<MarathonCategory | "">(draft.category);
  const [tshirtSize, setTshirtSize] = useState<TshirtSize | "">(draft.tshirtSize);
  const [emergencyContactName, setEmergencyContactName] = useState(draft.emergencyContactName);
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(draft.emergencyContactPhone);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoRejectionError, setPhotoRejectionError] = useState("");
  const [photoUploadError, setPhotoUploadError] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [pendingDraftId, setPendingDraftId] = useState<number | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!draft.participantType) {
      router.replace("/events/marathon/register");
      return;
    }
    if (!draft.emailVerifiedToken || !draft.email) {
      router.replace("/events/marathon/verify-email");
    }
  }, [hydrated, draft.participantType, draft.emailVerifiedToken, draft.email, router]);

  if (!draft.participantType || !draft.emailVerifiedToken) return null;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) e.fullName = "Full name is required.";
    const ageNum = Number(age);
    if (!age || !Number.isFinite(ageNum) || ageNum < 5 || ageNum > 100) e.age = "Enter a valid age (5–100).";
    if (!gender) e.gender = "Please select a gender.";
    if (!bloodGroup) e.bloodGroup = "Please select a blood group.";
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (!city.trim() || city.trim().length < 2) e.city = "City is required.";
    if (!category) e.category = "Please select a category.";
    if (!tshirtSize) e.tshirtSize = "Please select a t-shirt size.";
    if (!emergencyContactName.trim() || emergencyContactName.trim().length < 2)
      e.emergencyContactName = "Emergency contact name is required.";
    if (!/^[6-9]\d{9}$/.test(emergencyContactPhone))
      e.emergencyContactPhone = "Enter a valid emergency contact number.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /** Uploads the selected photo to Drive and attaches it to `draftId`. Returns success. */
  const uploadPhoto = async (draftId: number, file: File): Promise<boolean> => {
    setPhotoUploading(true);
    setPhotoUploadError("");
    try {
      const formData = new FormData();
      formData.append("draftId", String(draftId));
      formData.append("photo", file);

      const res = await fetch("/api/marathon/photo/upload", { method: "POST", body: formData });
      const data = (await res.json()) as PhotoUploadResponse | ApiErrorResponse;

      if (!res.ok || !("photoDriveFileId" in data)) {
        setPhotoUploadError("error" in data ? data.error : "Failed to upload photo. Please try again.");
        return false;
      }

      updateDraft({ photoDriveFileId: data.photoDriveFileId, photoDriveUrl: data.photoDriveUrl });
      return true;
    } catch {
      setPhotoUploadError("Network error while uploading photo. Please try again.");
      return false;
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!validate() || photoRejectionError) return;

    updateDraft({
      fullName,
      age,
      gender,
      bloodGroup,
      phone,
      city,
      category,
      tshirtSize,
      emergencyContactName,
      emergencyContactPhone,
    });

    setLoading(true);
    try {
      const payload: Omit<RegisterRequest, "age"> & { age: number } = {
        participantType: draft.participantType!,
        email: draft.email,
        emailVerifiedToken: draft.emailVerifiedToken!,
        pledgeAccepted: draft.pledgeAccepted,
        fullName: fullName.trim(),
        age: Number(age),
        gender: gender as Gender,
        bloodGroup: bloodGroup as BloodGroup,
        phone: phone.trim(),
        city: city.trim(),
        category: category as MarathonCategory,
        tshirtSize: tshirtSize as TshirtSize,
        emergencyContactName: emergencyContactName.trim(),
        emergencyContactPhone: emergencyContactPhone.trim(),
      };

      const res = await fetch("/api/marathon/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as RegisterResponse | ApiErrorResponse;

      if (!res.ok || !("draftId" in data)) {
        setSubmitError("error" in data ? data.error : "Something went wrong. Please try again.");
        return;
      }

      updateDraft({ draftId: data.draftId });
      setPendingDraftId(data.draftId);

      // Registration row now exists as 'pending' (unpaid). If a photo was
      // selected, upload it before moving on — on failure we stay here so
      // no payment is ever attempted against an incomplete upload.
      if (photoFile) {
        const uploaded = await uploadPhoto(data.draftId, photoFile);
        if (!uploaded) return;
      }

      router.push("/events/marathon/payment");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPhotoUpload = async () => {
    if (!pendingDraftId || !photoFile) return;
    const uploaded = await uploadPhoto(pendingDraftId, photoFile);
    if (uploaded) router.push("/events/marathon/payment");
  };

  const handleSkipPhotoAfterFailure = () => {
    setPhotoFile(null);
    setPhotoUploadError("");
    setPhotoRejectionError("");
    router.push("/events/marathon/payment");
  };

  return (
    <>
      <StepProgress current={4} />
      <section className="container-max py-10 sm:py-14 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-poppins font-black text-2xl sm:text-3xl text-navy mb-1.5">Registration Details</h1>
          <p className="font-inter text-navy/55 text-sm">Fill in your personal and emergency contact information</p>
        </div>

        <div className="space-y-7">
          {/* Personal information */}
          <fieldset className="space-y-5">
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-1">
              Personal Information
            </legend>

            <div>
              <FieldLabel required>Full Name</FieldLabel>
              <TextInput value={fullName} onChange={setFullName} placeholder="Enter your full name" hasError={!!errors.fullName} autoComplete="name" />
              <FieldError message={errors.fullName} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Age</FieldLabel>
                <TextInput value={age} onChange={setAge} type="number" placeholder="e.g. 28" hasError={!!errors.age} />
                <FieldError message={errors.age} />
              </div>
              <div>
                <FieldLabel required>Blood Group</FieldLabel>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className={[
                    "w-full px-4 py-3 rounded-xl border-2 font-inter text-sm text-navy bg-white outline-none transition-all duration-200",
                    errors.bloodGroup ? "border-red-400 bg-red-50/50" : "border-navy/15 hover:border-primary/40 focus:border-primary",
                  ].join(" ")}
                >
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.bloodGroup} />
              </div>
            </div>

            <div>
              <FieldLabel required>Gender</FieldLabel>
              <PillGroup options={GENDERS} value={gender} onChange={setGender} ariaLabel="Gender" columns={2} />
              <FieldError message={errors.gender} />
            </div>
          </fieldset>

          {/* Contact information */}
          <fieldset className="space-y-5">
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-1">
              Contact Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Mobile Number</FieldLabel>
                <TextInput value={phone} onChange={setPhone} type="tel" placeholder="10-digit mobile number" maxLength={10} hasError={!!errors.phone} autoComplete="tel" />
                <FieldError message={errors.phone} />
              </div>
              <div>
                <FieldLabel required>City</FieldLabel>
                <TextInput value={city} onChange={setCity} placeholder="Your city" hasError={!!errors.city} autoComplete="address-level2" />
                <FieldError message={errors.city} />
              </div>
            </div>

            <div>
              <FieldLabel>Email Address</FieldLabel>
              <TextInput value={draft.email} onChange={() => {}} disabled type="email" />
              <p className="text-navy/40 text-xs font-inter mt-1.5">Verified — this is where your confirmation will be sent.</p>
            </div>
          </fieldset>

          {/* Category */}
          <fieldset>
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-3">
              Category
            </legend>
            <PillGroup
              options={CATEGORIES}
              value={category}
              onChange={setCategory}
              ariaLabel="Category"
              columns={3}
              labels={CATEGORY_LABELS}
            />
            <FieldError message={errors.category} />
          </fieldset>

          {/* Additional information */}
          <fieldset>
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-3">
              T-Shirt Size
            </legend>
            <PillGroup options={TSHIRT_SIZES} value={tshirtSize} onChange={setTshirtSize} ariaLabel="T-shirt size" columns={3} />
            <FieldError message={errors.tshirtSize} />
          </fieldset>

          {/* Photo (optional) */}
          <fieldset>
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-3">
              Passport Size Photo (Optional)
            </legend>
            <PhotoUpload
              file={photoFile}
              onSelect={setPhotoFile}
              rejectionError={photoRejectionError}
              onRejectionError={setPhotoRejectionError}
              disabled={loading || photoUploading}
            />
            {photoUploadError && (
              <div role="alert" className="mt-3 bg-red-50 px-4 py-3 rounded-xl">
                <p className="text-red-500 text-sm font-inter">{photoUploadError}</p>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={handleRetryPhotoUpload}
                    disabled={photoUploading}
                    className="text-xs font-poppins font-semibold text-primary hover:underline disabled:opacity-50"
                  >
                    Retry Upload
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipPhotoAfterFailure}
                    disabled={photoUploading}
                    className="text-xs font-poppins font-semibold text-navy/60 hover:underline disabled:opacity-50"
                  >
                    Continue Without Photo
                  </button>
                </div>
              </div>
            )}
          </fieldset>

          {/* Emergency contact */}
          <fieldset className="space-y-5 pt-2 border-t-2 border-primary/10">
            <legend className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-1 pt-5">
              Emergency Contact
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Emergency Contact Name</FieldLabel>
                <TextInput value={emergencyContactName} onChange={setEmergencyContactName} placeholder="Full name" hasError={!!errors.emergencyContactName} />
                <FieldError message={errors.emergencyContactName} />
              </div>
              <div>
                <FieldLabel required>Emergency Contact Number</FieldLabel>
                <TextInput value={emergencyContactPhone} onChange={setEmergencyContactPhone} type="tel" placeholder="10-digit mobile number" maxLength={10} hasError={!!errors.emergencyContactPhone} />
                <FieldError message={errors.emergencyContactPhone} />
              </div>
            </div>
          </fieldset>

          {submitError && (
            <p role="alert" className="text-red-500 text-sm font-inter text-center bg-red-50 px-4 py-3 rounded-xl">
              {submitError}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => router.push("/events/marathon/verify-email")}
              disabled={loading || photoUploading}
              className="flex-1 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || photoUploading || !!photoRejectionError}
              className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-70"
            >
              {loading || photoUploading ? <Loader2 size={16} className="animate-spin" /> : null}
              {photoUploading ? "Uploading Photo…" : "Continue to Payment"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
