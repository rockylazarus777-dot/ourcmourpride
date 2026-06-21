export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mr. E.Praiselin Nimalan",
    designation: "President",
    
    image: "/images/team/member-1.png",
    description:
      "Leading the organization with a vision for community development and social impact.",
  },
  {
    id: 2,
    name: "Dr Michael Irudhayaraj",
    designation: "General Secretary",
    image: "/images/team/member-2.png",
    description:
      "Coordinating operations, outreach programs, and cross-team initiatives to ensure seamless community impact.",
  },
  {
    id: 3,
    name: " Mr. Adv Densing",
    designation: "District Coordinator",
    image: "/images/team/member-3.png",
    description:
      "Managing ground-level welfare programs and building strong networks across all districts in Tamil Nadu.",
  },
  {
    id: 4,
    name: "Ms. Rtn Dr Krithika",
    designation: "Youth Wing Leader",
    image: "/images/team/member-4.png",
    description:
      "Empowering young citizens through skill development, entrepreneurship programs, and civic engagement.",
  },
  {
    id: 5,
    name: "Dr J Packiaselvi",
    designation: "Women's Welfare Head",
    image: "/images/team/member-5.png",
    description:
      "Championing women's rights, safety, health awareness, and self-help group empowerment across communities.",
  },
  {
    id: 6,
    name: "Mr. Anesh Sundaran",
    designation: "Public Relations Officer",
    image: "/images/team/member-6.png",
    description:
      "Driving community awareness, media outreach, and public communication for welfare initiatives.",
  },

];
