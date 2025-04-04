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
        <div className="bg-white pt-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
                        Our Journey
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Binara Medical Centre has been a trusted name in healthcare since 2008
                    </p>
                </div>

                <div className="flow-root">
                    <ul className="-mb-8">
                        {milestones.map((milestone, index) => (
                            <li key={index}>
                                <div className="relative pb-8">
                                    {index !== milestones.length - 1 ? (
                                        <span
                                            className="absolute top-6 left-6 -ml-px h-full w-0.5 bg-indigo-200"
                                            aria-hidden="true"
                                        />
                                    ) : null}
                                    <div className="relative flex space-x-3">
                                        <div>
                                            <span className={`h-12 w-12 rounded-full ${milestone.iconBgColor} flex items-center justify-center ring-8 ring-white`}>
                                                {milestone.icon}
                                            </span>
                                        </div>
                                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p className="text text-gray-700">
                                                    <span className={`font-bold ${milestone.color}`}>{milestone.year}</span> - {milestone.title}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>
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