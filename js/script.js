document.addEventListener("DOMContentLoaded", () => {
    const startDateISO = "2025-07-05T00:00:00";

    const startButton = document.querySelector(".start-btn");
    const loveContent = document.getElementById("loveContent");
    const swiperWrapper = document.getElementById("swiperWrapper");
    const timeTogether = document.getElementById("timeTogether");
    const startScreen = document.querySelector(".start-screen");

    const imageNames = ["1.png"];
    const IMAGE_BASE = "./img/";

    let heartsInterval = null;
    let sparklesInterval = null;

    async function loadImages() {
        try {
            swiperWrapper.innerHTML = imageNames
                .map(
                    (name, i) => `
            <div class="swiper-slide">
            <img
                src="${IMAGE_BASE}${name}"
                alt="Photo ${i + 1}"
                loading="lazy"
            />
            </div>`
                )
                .join("");
        } catch (error) {
            console.error("Error loading images:", error);
        }
    }

    function stopAnimations() {
        if (heartsInterval) {
            clearInterval(heartsInterval);
            heartsInterval = null;
        }
        if (sparklesInterval) {
            clearInterval(sparklesInterval);
            sparklesInterval = null;
        }
    }

    function triggerSparkles() {
        sparklesInterval = setInterval(() => {
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle";
            sparkle.style.left = `${Math.random() * 100}vw`;
            sparkle.style.animationDuration = `${4 + Math.random() * 3}s`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 8000);
        }, 300);
    }

    function triggerHearts() {
        heartsInterval = setInterval(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${6 + Math.random() * 4}s`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 10000);
        }, 400);
    }

    function checkAnniversary() {
        const DateTime = luxon.DateTime;
        const start = DateTime.fromISO(startDateISO);
        const now = DateTime.now();

        const isMonthlyAnniversary = now.day === start.day;

        stopAnimations();

        if (isMonthlyAnniversary) {
            document.body.classList.add("special-theme");
            triggerHearts();
            console.log("especial")
        } else {
            document.body.classList.remove("special-theme");
            triggerSparkles();
            console.log("normal")
        }
    }

    function updateCounter() {
        const DateTime = luxon.DateTime;
        const start = DateTime.fromISO(startDateISO);

        setInterval(() => {
            const now = DateTime.now();
            const diff = now.diff(start, [
                "years",
                "months",
                "days",
                "hours",
                "minutes",
                "seconds",
            ]).toObject();

            const boxes = [{
                    label: "Anos",
                    value: Math.floor(diff.years)
                },
                {
                    label: "Meses",
                    value: Math.floor(diff.months)
                },
                {
                    label: "Dias",
                    value: Math.floor(diff.days)
                },
                {
                    label: "Horas",
                    value: Math.floor(diff.hours)
                },
                {
                    label: "Minutos",
                    value: Math.floor(diff.minutes)
                },
                {
                    label: "Segundos",
                    value: Math.floor(diff.seconds)
                },
            ];

            timeTogether.innerHTML = boxes
                .map(
                    (b) => `
          <div class="counter-box">
            <strong>${b.value}</strong>
            ${b.label}
          </div>
        `
                )
                .join("");
        }, 1000);
    }

    function startVideo() {
        const video = document.getElementById("loveVideo");
        if (video) {
            video.play();
        }
    }

    async function startLove() {
        if (startScreen) {
            startScreen.classList.add("hidden");
            setTimeout(() => {
                startScreen.style.display = "none";
            }, 800);
        }

        await loadImages();
        loveContent.classList.add("visible");

        setTimeout(() => {
            new Swiper(".swiper", {
                loop: true,
                autoplay: {
                    delay: 3500
                },
            });
        }, 100);

        updateCounter();
        checkAnniversary();
        setTimeout(() => startVideo(), 500);
    }

    startButton.addEventListener("click", () => {
        startLove();
    });
});