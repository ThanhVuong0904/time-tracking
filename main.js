const tabs = document.querySelectorAll(".user-bottom-item");
let currentTab = "daily";
let data = [];

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        document
            .querySelector(".user-bottom-item.active")
            .classList.remove("active");

        tab.classList.add("active");
        currentTab = tab.textContent.toLowerCase();
        render();
    });
});

const getData = async (callback) => {
    const res = await fetch("data.json");
    data = await res.json();
    callback();
};

const render = () => {
    let htmls = data.map((tracking, index) => {
        const { title, timeframes } = tracking;
        return `
            <div class="tracking">
                <div class="tracking-background background-${index}"></div>
                <div class="tracking-body">
                    <div class="tracking-title">
                        <p>${title}</p>
                        <img
                            src="./images/icon-ellipsis.svg"
                            alt="ellipsis"
                        />
                    </div>
                    <div class="tracking-content">
                        <div class="tracking-hrs">${timeframes[currentTab].current}hrs</div>
                        <div class="tracking-bottom">
                            Last Week - ${timeframes[currentTab].previous}hrs
                        </div>
                    </div>
                </div>
            </div>
            `;
    });
    document.querySelector(".trackings").innerHTML = htmls.join("");
};

getData(render);
