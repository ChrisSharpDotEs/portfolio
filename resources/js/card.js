

function createCard(user) {
    const card = document.createElement("div");
    card.classList.add("rounded", "p-4", "bg-[#171717]", "text-gray-200");

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex", "xl:flex-row", "lg:flex-col", "md:flex-col", "sm:flex-row", "justify-between", "gap-3");

    // Sección de usuario
    const userSection = document.createElement("div");
    userSection.classList.add("flex", "flex-col", "gap-2");

    const userInfo = document.createElement("div");
    userInfo.classList.add("flex", "gap-2");

    const userImage = document.createElement("img");
    userImage.classList.add("rounded-full");
    userImage.src = user.image;
    userImage.alt = user.name;
    userImage.style.width = "40px";
    userImage.style.height = "40px";

    const userDetails = document.createElement("div");

    const userName = document.createElement("h2");
    userName.classList.add("font-semibold");
    userName.textContent = user.name;

    const userRole = document.createElement("p");
    userRole.classList.add("text-sm", "text-gray-400");
    userRole.textContent = user.role;

    userDetails.appendChild(userName);
    userDetails.appendChild(userRole);
    userInfo.appendChild(userImage);
    userInfo.appendChild(userDetails);
    userSection.appendChild(userInfo);

    const userTasks = document.createElement("p");
    userTasks.classList.add("text-sm", "text-gray-400");
    userTasks.textContent = `${user.tasksCompleted} from ${user.totalTasks} tasks completed`;

    userSection.appendChild(userTasks);

    // Barra de progreso (SVG)
    const progressBar = progressBarGenerator(user.tasksCompleted);
    userSection.appendChild(progressBar);

    // Sección de ingresos
    const revenueSection = document.createElement("div");

    const revenueAmount = document.createElement("h2");
    revenueAmount.classList.add("text-green-700", "text-xl", "font-bold");
    revenueAmount.textContent = `$${user.revenue.toFixed(2)}`;

    const revenueLabel = document.createElement("p");
    revenueLabel.classList.add("text-sm", "text-gray-400");
    revenueLabel.textContent = "Last 6 months";

    revenueSection.appendChild(revenueAmount);
    revenueSection.appendChild(revenueLabel);

    wrapper.appendChild(userSection);
    wrapper.appendChild(revenueSection);
    card.appendChild(wrapper);

    return card;
}

function progressBarGenerator(progress) {
    const container = document.getElementById("svg-container");
    
    const svgPath = `public/svg/progress-${progress}.svg`;
    const imgElement = document.createElement("img");
    imgElement.src = svgPath;
    imgElement.alt = `Progreso ${progress}%`;
    imgElement.classList.add("w-44", "mt-3");

    return imgElement;
}

const candidates = [
    {
        name: "John Alonso",
        role: "Sales Manager USA",
        image: "./public/img/benijo.webp",
        tasksCompleted: 3,
        totalTasks: 5,
        revenue: 3490.00
    },
    {
        name: "Carmen Sandiego",
        role: "Sales consultant USA",
        image: "./public/img/benijo.webp",
        tasksCompleted: 2,
        totalTasks: 5,
        revenue: 2500.00
    },
    {
        name: "John John",
        role: "Sales Manager USA",
        image: "./public/img/benijo.webp",
        tasksCompleted: 4,
        totalTasks: 5,
        revenue: 3700.51
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("candidate-dashboard");
    if (container) {
        container.innerHTML = '';
        candidates.forEach(item => {
            container.appendChild(createCard(item));
        })
    }
})