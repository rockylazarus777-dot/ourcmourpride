export type EventCategory =
  | "Healthcare & Wellness"
  | "Education & Youth Development"
  | "Women Empowerment"
  | "Environment & Sustainability"
  | "Community Welfare"
  | "Agriculture & Rural Development"
  | "Public Awareness & Safety"
  | "Culture & Sports";

export interface EventItem {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  iconName: string;
}

export interface CategoryConfig {
  badgeColor: string;
  iconBg: string;
  iconColor: string;
}

export const categoryConfig: Record<EventCategory, CategoryConfig> = {
  "Healthcare & Wellness": {
    badgeColor: "bg-rose-50 text-rose-600 border border-rose-100",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  "Education & Youth Development": {
    badgeColor: "bg-blue-50 text-blue-600 border border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  "Women Empowerment": {
    badgeColor: "bg-purple-50 text-purple-600 border border-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  "Environment & Sustainability": {
    badgeColor: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  "Community Welfare": {
    badgeColor: "bg-teal-50 text-teal-600 border border-teal-100",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  "Agriculture & Rural Development": {
    badgeColor: "bg-amber-50 text-amber-700 border border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  "Public Awareness & Safety": {
    badgeColor: "bg-orange-50 text-orange-600 border border-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  "Culture & Sports": {
    badgeColor: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
};

export const events: EventItem[] = [
  {
    id: 1,
    title: "Free Medical Camp",
    description:
      "Providing free medical consultations, basic diagnostics, and health screenings to underserved communities across Tamil Nadu.",
    category: "Healthcare & Wellness",
    iconName: "Stethoscope",
  },
  {
    id: 2,
    title: "Tree Plantation Drive",
    description:
      "Mobilizing citizens, students, and volunteers to plant trees, restore green cover, and promote environmental sustainability.",
    category: "Environment & Sustainability",
    iconName: "Leaf",
  },
  {
    id: 3,
    title: "Women's Safety Awareness Camp",
    description:
      "Educating women on personal safety measures, legal rights, and emergency support resources for a safer community.",
    category: "Women Empowerment",
    iconName: "Shield",
  },
  {
    id: 4,
    title: "Eye Screening and Free Spectacle Distribution",
    description:
      "Offering comprehensive eye health screenings and distributing free spectacles to individuals with visual impairments.",
    category: "Healthcare & Wellness",
    iconName: "Eye",
  },
  {
    id: 5,
    title: "Organ Donation Awareness Camp",
    description:
      "Spreading awareness about the life-saving importance of organ donation and encouraging citizens to register as donors.",
    category: "Healthcare & Wellness",
    iconName: "Heart",
  },
  {
    id: 6,
    title: "Women's Health Awareness Program",
    description:
      "Educating women on maternal health, preventive care, nutrition, and access to essential healthcare services.",
    category: "Women Empowerment",
    iconName: "HeartPulse",
  },
  {
    id: 7,
    title: "Educational Scholarship Assistance for Students",
    description:
      "Identifying deserving students and facilitating access to government and private scholarship programs for higher education.",
    category: "Education & Youth Development",
    iconName: "GraduationCap",
  },
  {
    id: 8,
    title: "Distribution of Free Notebooks",
    description:
      "Distributing free notebooks and stationery to students from economically weaker sections to support their education.",
    category: "Education & Youth Development",
    iconName: "BookOpen",
  },
  {
    id: 9,
    title: "Distribution of Educational Materials for Students",
    description:
      "Supplying essential learning resources including textbooks, geometry kits, and study materials to school-going children.",
    category: "Education & Youth Development",
    iconName: "Package",
  },
  {
    id: 10,
    title: "Six-Month Free Chess Training Program",
    description:
      "Offering structured chess training over six months to develop strategic thinking and cognitive skills in young students.",
    category: "Education & Youth Development",
    iconName: "Brain",
  },
  {
    id: 11,
    title: "Skill Development Training Camp",
    description:
      "Providing hands-on vocational training in high-demand skills to improve employability and economic self-reliance.",
    category: "Education & Youth Development",
    iconName: "Wrench",
  },
  {
    id: 12,
    title: "Employment Guidance Camp",
    description:
      "Connecting job seekers with career counselors, recruitment advisors, and government employment scheme information.",
    category: "Education & Youth Development",
    iconName: "Briefcase",
  },
  {
    id: 13,
    title: "Youth Entrepreneurship Promotion Program",
    description:
      "Inspiring young entrepreneurs through mentoring, business development workshops, and funding scheme guidance.",
    category: "Education & Youth Development",
    iconName: "Lightbulb",
  },
  {
    id: 14,
    title: "Environmental Protection Awareness Rally",
    description:
      "Organizing community rallies to raise awareness about environmental protection and responsible ecological practices.",
    category: "Environment & Sustainability",
    iconName: "Globe",
  },
  {
    id: 15,
    title: "Plastic Eradication Awareness Campaign",
    description:
      "Promoting plastic-free living through awareness drives, alternative product demonstrations, and community pledges.",
    category: "Environment & Sustainability",
    iconName: "Trash2",
  },
  {
    id: 16,
    title: "Water Conservation Awareness Program",
    description:
      "Educating communities on rainwater harvesting, groundwater preservation, and responsible water usage practices.",
    category: "Environment & Sustainability",
    iconName: "Droplet",
  },
  {
    id: 17,
    title: "School Campus Cleanliness Drive",
    description:
      "Organizing hygiene and cleanliness campaigns across school campuses to foster healthy and safe learning environments.",
    category: "Environment & Sustainability",
    iconName: "Sparkles",
  },
  {
    id: 18,
    title: "Public Cleanliness Initiative",
    description:
      "Mobilizing community volunteers to clean public spaces, streets, and common areas to promote civic responsibility.",
    category: "Environment & Sustainability",
    iconName: "CheckCircle2",
  },
  {
    id: 19,
    title: "Distribution of Assistive Devices for Persons with Disabilities",
    description:
      "Providing wheelchairs, hearing aids, and mobility aids to persons with disabilities for greater independence and dignity.",
    category: "Community Welfare",
    iconName: "Accessibility",
  },
  {
    id: 20,
    title: "Senior Citizens Welfare Assistance Program",
    description:
      "Offering health check-ups, social support, and welfare scheme guidance specifically tailored for elderly citizens.",
    category: "Community Welfare",
    iconName: "Users",
  },
  {
    id: 21,
    title: "Support and Assistance for Orphanages and Care Homes",
    description:
      "Providing essential supplies, nutritional support, and infrastructure assistance to orphanages and old age care homes.",
    category: "Community Welfare",
    iconName: "Home",
  },
  {
    id: 22,
    title: "Educational Assistance for Orphaned Children",
    description:
      "Extending scholarships, school supplies, and mentoring support to orphaned children to ensure their educational continuity.",
    category: "Community Welfare",
    iconName: "BookMarked",
  },
  {
    id: 23,
    title: "Women's Self-Help Group Empowerment Program",
    description:
      "Strengthening women's self-help groups through financial literacy, skill development, and market access support.",
    category: "Women Empowerment",
    iconName: "Users2",
  },
  {
    id: 24,
    title: "Blood Donation Camp",
    description:
      "Organizing voluntary blood donation drives to ensure adequate blood supply for hospitals and emergency medical needs.",
    category: "Healthcare & Wellness",
    iconName: "Droplets",
  },
  {
    id: 25,
    title: "Legal Awareness Camp",
    description:
      "Educating citizens on their fundamental rights, legal provisions, and access to free legal aid services.",
    category: "Public Awareness & Safety",
    iconName: "Scale",
  },
  {
    id: 26,
    title: "Anti-Drug Awareness Program",
    description:
      "Sensitizing youth and communities about the dangers of substance abuse and promoting drug-free lifestyles.",
    category: "Public Awareness & Safety",
    iconName: "AlertTriangle",
  },
  {
    id: 27,
    title: "Road Safety Awareness Camp",
    description:
      "Promoting traffic rules, helmet usage, safe driving habits, and pedestrian safety to reduce road accidents.",
    category: "Public Awareness & Safety",
    iconName: "Car",
  },
  {
    id: 28,
    title: "Cyber Safety and Internet Security Awareness Program",
    description:
      "Educating citizens on digital safety, online fraud prevention, and responsible internet usage practices.",
    category: "Public Awareness & Safety",
    iconName: "Lock",
  },
  {
    id: 29,
    title: "Voter Awareness Campaign",
    description:
      "Encouraging voter registration and democratic participation through community outreach and civic education programs.",
    category: "Public Awareness & Safety",
    iconName: "Vote",
  },
  {
    id: 30,
    title: "Consumer Rights Awareness Camp",
    description:
      "Informing citizens about consumer protection laws, grievance redressal mechanisms, and their rights in the marketplace.",
    category: "Public Awareness & Safety",
    iconName: "ShoppingBag",
  },
  {
    id: 31,
    title: "Technical Advisory Camp for Farmers",
    description:
      "Providing expert agricultural guidance on modern farming techniques, crop management, and government support schemes.",
    category: "Agriculture & Rural Development",
    iconName: "Sprout",
  },
  {
    id: 32,
    title: "Natural Farming Awareness Program",
    description:
      "Promoting chemical-free, sustainable farming methods to protect soil health and ensure food safety for consumers.",
    category: "Agriculture & Rural Development",
    iconName: "Wheat",
  },
  {
    id: 33,
    title: "Veterinary Medical Camp",
    description:
      "Offering free veterinary care, vaccination, and health check-ups for livestock and pet animals in rural communities.",
    category: "Agriculture & Rural Development",
    iconName: "PawPrint",
  },
  {
    id: 34,
    title: "Fisherfolk Welfare Advisory Camp",
    description:
      "Extending welfare support, advisory services, and information on government schemes to fishing communities.",
    category: "Agriculture & Rural Development",
    iconName: "Fish",
  },
  {
    id: 35,
    title: "Free Medicine Distribution Program",
    description:
      "Distributing essential medicines free of cost to individuals who cannot afford them, ensuring accessible healthcare.",
    category: "Healthcare & Wellness",
    iconName: "Pill",
  },
  {
    id: 36,
    title: "Nutrition and Healthy Food Awareness Program",
    description:
      "Promoting balanced nutrition, healthy dietary habits, and the importance of essential vitamins and minerals.",
    category: "Healthcare & Wellness",
    iconName: "Apple",
  },
  {
    id: 37,
    title: "Yoga and Physical Fitness Camp",
    description:
      "Conducting guided yoga sessions, fitness demonstrations, and wellness workshops for all age groups in the community.",
    category: "Healthcare & Wellness",
    iconName: "Activity",
  },
  {
    id: 38,
    title: "Mental Health Awareness Program",
    description:
      "Raising awareness about mental well-being, stress management, and available counseling and psychiatric support services.",
    category: "Healthcare & Wellness",
    iconName: "Smile",
  },
  {
    id: 39,
    title: "Career Guidance Seminar for Students",
    description:
      "Helping students explore career pathways, competitive examinations, and professional development opportunities.",
    category: "Education & Youth Development",
    iconName: "Target",
  },
  {
    id: 40,
    title: "Library Development Program",
    description:
      "Establishing and upgrading community libraries to promote reading culture and knowledge access for all citizens.",
    category: "Education & Youth Development",
    iconName: "Library",
  },
  {
    id: 41,
    title: "Book Donation Drive",
    description:
      "Collecting and distributing quality books to schools, libraries, and underprivileged students across communities.",
    category: "Education & Youth Development",
    iconName: "Book",
  },
  {
    id: 42,
    title: "Tamil Literature and Cultural Program",
    description:
      "Celebrating Tamil heritage through literary events, cultural performances, and programs promoting classical arts.",
    category: "Culture & Sports",
    iconName: "Music",
  },
  {
    id: 43,
    title: "Youth Sports Competitions",
    description:
      "Organizing district-level sports tournaments to identify athletic talent and encourage a culture of healthy competition.",
    category: "Culture & Sports",
    iconName: "Trophy",
  },
  {
    id: 44,
    title: "Women's Sports Promotion Program",
    description:
      "Encouraging women's participation in sports through coaching camps, competitions, and dedicated infrastructure support.",
    category: "Culture & Sports",
    iconName: "Medal",
  },
  {
    id: 45,
    title: "Disaster Management Awareness Camp",
    description:
      "Preparing communities for natural disasters through safety drills, emergency planning, and first-aid training.",
    category: "Public Awareness & Safety",
    iconName: "AlertOctagon",
  },
  {
    id: 46,
    title: "Fire Safety Training Program",
    description:
      "Training community members in fire prevention, safe evacuation procedures, and fire extinguisher usage techniques.",
    category: "Public Awareness & Safety",
    iconName: "Flame",
  },
  {
    id: 47,
    title: "Electrical Safety Awareness Program",
    description:
      "Educating households and workers on electrical hazard prevention, safe wiring practices, and emergency response.",
    category: "Public Awareness & Safety",
    iconName: "Zap",
  },
  {
    id: 48,
    title: "Digital Literacy Training Camp",
    description:
      "Building digital competency among citizens through training in smartphones, internet access, and e-government services.",
    category: "Public Awareness & Safety",
    iconName: "Monitor",
  },
  {
    id: 49,
    title: "Government Welfare Schemes Awareness Camp",
    description:
      "Guiding citizens on eligibility, application processes, and benefits of state and central government welfare programs.",
    category: "Public Awareness & Safety",
    iconName: "Building2",
  },
  {
    id: 50,
    title: "Public Grievance Redressal and Consultation Camp",
    description:
      "Providing a platform for citizens to raise concerns and receive direct assistance from officials and community leaders.",
    category: "Public Awareness & Safety",
    iconName: "MessageSquare",
  },
  {
    id: 51,
    title: "Our Chief Minister – Our Pride Marathon",
    description:
      "A flagship community marathon celebrating leadership, unity, and the spirit of public welfare and citizen participation.",
    category: "Culture & Sports",
    iconName: "Flag",
  },
  {
    id: 52,
    title: "State-Level Public Welfare Pledge and Birthday Celebration Valedictory Function – Our CM, Our Pride Initiative",
    description:
      "A landmark state-level celebration marking the Our CM Our Pride initiative with a public welfare pledge and valedictory program.",
    category: "Culture & Sports",
    iconName: "Award",
  },
];
