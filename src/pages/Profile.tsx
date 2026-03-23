import { ProfileHeader } from "../components/profile/sections/ProfileHeader";
import { CareerGoalSection } from "../components/profile/sections/CareerGoalSection";
import { ExperienceSection } from "../components/profile/sections/ExperienceSection";
import { SkillsSection } from "../components/profile/sections/SkillsSection";
import { EducationSection } from "../components/profile/sections/EducationSection";
import { ProjectsSection } from "../components/profile/sections/Projects_ActivitiesSection";

const Profile = () => (
    <div className="max-w-5xl mx-auto pb-20 space-y-4">
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight mb-8">Hồ sơ cá nhân</h1>
        <ProfileHeader />
        <CareerGoalSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
    </div>
);

export default Profile;
