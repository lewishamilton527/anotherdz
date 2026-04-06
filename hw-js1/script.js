function checkAge(age) {
    if (age >= 18) {
        return "взрослый";
    }
    return "ребёнок";
}

const studentsList = [
    { name: "Алихан", age: 15, class: "9А" },
    { name: "Мадина", age: 17, class: "11Б" },
    { name: "Ерасыл", age: 14, class: "8В" }
];

for (const student of studentsList) {
    console.log(student.name, student.age, student.class);
}

function calculateGrade(score) {
    if (score >= 90) {
        return "A";
    }
    if (score >= 70) {
        return "B";
    }
    return "C";
}

console.log(checkAge(15));
console.log(checkAge(20));
console.log(calculateGrade(95));
console.log(calculateGrade(82));
console.log(calculateGrade(60));
