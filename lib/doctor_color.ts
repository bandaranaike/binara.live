const doctorColors = [
    "gray", "blue", "green",
    "red", "purple", "pink", "indigo",
    "teal", "orange", "amber", "lime",
    "emerald", "cyan", "sky", "violet",
    "fuchsia", "rose", "slate", "zinc",
    "stone", "neutral", "yellow"
];
const getDoctorColor = (doctorId: number) => {
    return doctorColors[doctorId % doctorColors.length];
}

export default getDoctorColor;