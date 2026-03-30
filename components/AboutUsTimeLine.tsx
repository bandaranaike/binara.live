import {
    BuildingOffice2Icon,
    HeartIcon,
    UserGroupIcon,
    DevicePhoneMobileIcon,
    ArrowPathIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const AboutUsTimeline = () => {
    const milestones = [
        {
            year: "2008",
            color: 'text-zinc-600',
            iconBgColor: 'bg-zinc-600',
            title: "Foundation",
            description: "Binara Medical Centre was established in Kundasale, Kandy with a vision to provide quality healthcare to the community.",
            icon: <BuildingOffice2Icon className="h-8 w-8 text-white"/>
        },
        {
            year: "2010",
            color: 'text-pink-600',
            iconBgColor: 'bg-pink-600',
            title: "First Expansion",
            description: "Expanded our facilities to include specialist consultation services, growing our team of experienced doctors.",
            icon: <HeartIcon className="h-8 w-8 text-white"/>
        },
        {
            year: "2013",
            color: 'text-yellow-400',
            iconBgColor: 'bg-yellow-400',
            title: "Community Care",
            description: "Launched community health programs to serve underprivileged areas around Kandy.",
            icon: <UserGroupIcon className="h-8 w-8 text-white"/>
        },
        {
            year: "2018",
            color: 'text-lime-600',
            iconBgColor: 'bg-lime-600',
            title: "Facility Upgrade",
            description: "Renovated and upgraded our medical equipment to provide state-of-the-art diagnostic services.",
            icon: <ArrowPathIcon className="h-8 w-8 text-white"/>
        },
        {
            year: "2024",
            color: 'text-cyan-600',
            iconBgColor: 'bg-cyan-600',
            title: "Digital Transformation",
            description: "Implemented digital record systems and online appointment booking for better patient convenience.",
            icon: <DevicePhoneMobileIcon className="h-8 w-8 text-white"/>
        },
        {
            year: "Present",
            color: 'text-fuchsia-600',
            iconBgColor: 'bg-fuchsia-600',
            title: "Continued Excellence",
            description: "Serving the community with comprehensive OPD, specialist, and dental care with compassion and expertise.",
            icon: <ClockIcon className="h-8 w-8 text-white"/>
        }
    ];

    return (
        <div className="px-1 py-1 sm:px-2 lg:px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="mt-4 text-2xl font-extrabold text-gray-800 sm:text-3xl">
                        Our Journey
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Binara Medical Centre has been a trusted name in healthcare since 2008
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-purple-200 via-rose-200 to-transparent"/>
                    <ul className="space-y-5">
                        {milestones.map((milestone, index) => (
                            <li key={index}>
                                <div className="relative flex gap-4">
                                    <div className="relative z-10 flex-shrink-0">
                                        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${milestone.iconBgColor} shadow-[0_12px_30px_-18px_rgba(15,23,42,0.55)] ring-4 ring-white`}>
                                            {milestone.icon}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 rounded-xl border border-purple-100/80 bg-white/80 px-5 py-4 shadow-[0_18px_40px_-34px_rgba(91,33,182,0.22)] backdrop-blur-sm">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className={`inline-flex rounded-full bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${milestone.color}`}>
                                                    {milestone.year}
                                                </div>
                                                <h3 className="mt-3 text-lg font-bold text-slate-900">
                                                    {milestone.title}
                                                </h3>
                                            </div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                Milestone {index + 1}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUsTimeline;
