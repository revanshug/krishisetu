const translations = {

    en: {

        title:
            "Smart Market Intelligence for Farmers",

        description:
            "Connecting farmers with better prices, trusted buyers and smarter decisions.",

        farmerButton:
            "👨‍🌾 Farmer Dashboard",

        buyerButton:
            "🏢 Buyer Dashboard"

    },


    mr: {

        title:
            "शेतकऱ्यांसाठी स्मार्ट बाजार माहिती",

        description:
            "शेतकऱ्यांना चांगले दर, विश्वासू खरेदीदार आणि योग्य निर्णय मिळवून देणारे व्यासपीठ.",

        farmerButton:
            "👨‍🌾 शेतकरी डॅशबोर्ड",

        buyerButton:
            "🏢 खरेदीदार डॅशबोर्ड"

    },


    hi: {

        title:
            "किसानों के लिए स्मार्ट बाजार जानकारी",

        description:
            "किसानों को बेहतर कीमत, भरोसेमंद खरीदार और बेहतर निर्णय लेने में मदद करने वाला प्लेटफॉर्म।",

        farmerButton:
            "👨‍🌾 किसान डैशबोर्ड",

        buyerButton:
            "🏢 खरीदार डैशबोर्ड"

    }

};



/* LANGUAGE */

function changeLanguage(language) {

    const t = translations[language];

    document.getElementById("title").textContent =
        t.title;

    document.getElementById("description").textContent =
        t.description;

    document.getElementById("farmerButton").textContent =
        t.farmerButton;

    document.getElementById("buyerButton").textContent =
        t.buyerButton;

}



/* OPEN FARMER DASHBOARD */

function openFarmerDashboard() {

    document.getElementById("home")
        .classList.add("hidden");


    document.getElementById("dashboard")
        .classList.remove("hidden");

}



/* BUYER */

function openBuyerDashboard() {

    alert(
        "Buyer Dashboard will be added next!"
    );

}



/* HOME */

function goHome() {

    document.getElementById("dashboard")
        .classList.add("hidden");


    document.getElementById("home")
        .classList.remove("hidden");

}



/* SIDEBAR NAVIGATION */

function showSection(sectionName) {


    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    sections.forEach(
        function(section) {

            section.classList.add("hidden");

        }
    );


    document.getElementById(sectionName)
        .classList.remove("hidden");


    const menus =
        document.querySelectorAll(".menu");


    menus.forEach(
        function(menu) {

            menu.classList.remove("active");

        }
    );


    event.currentTarget
        .classList.add("active");

}



/* ACCEPT OFFER */

function acceptOffer() {

    alert(
        "🎉 Offer accepted! Order has been created."
    );

}



/* LANGUAGE EVENT */

document
    .getElementById("languageSelect")
    .addEventListener(
        "change",
        function() {

            changeLanguage(
                this.value
            );

        }
    );
/* MARKET INTELLIGENCE */

const marketData = {

    onion: [

        {
            name: "Pune",
            price: 2450,
            transport: 30,
            distance: 25
        },

        {
            name: "Manchar",
            price: 2480,
            transport: 50,
            distance: 42
        },

        {
            name: "Narayangaon",
            price: 2510,
            transport: 70,
            distance: 58
        }

    ],


    tomato: [

        {
            name: "Pune",
            price: 1850,
            transport: 30,
            distance: 25
        },

        {
            name: "Manchar",
            price: 1920,
            transport: 50,
            distance: 42
        },

        {
            name: "Narayangaon",
            price: 1980,
            transport: 70,
            distance: 58
        }

    ],


    potato: [

        {
            name: "Pune",
            price: 2100,
            transport: 30,
            distance: 25
        },

        {
            name: "Manchar",
            price: 2180,
            transport: 50,
            distance: 42
        },

        {
            name: "Narayangaon",
            price: 2210,
            transport: 70,
            distance: 58
        }

    ]

};



function calculateMarket() {

    const crop =
        document.getElementById(
            "cropSelect"
        ).value;


    const quantity =
        Number(
            document.getElementById(
                "quantityInput"
            ).value
        );


    if (!quantity || quantity <= 0) {

        alert(
            "Please enter a valid quantity."
        );

        return;

    }


    const markets =
        marketData[crop];


    /*
       Calculate net price.

       Net Price =
       Market Price - Transport Cost
    */


    const calculatedMarkets =
        markets.map(
            function(market) {

                return {

                    ...market,

                    net:
                        market.price -
                        market.transport,

                    revenue:
                        (market.price -
                         market.transport)
                        * quantity

                };

            }
        );


    /*
       Find market with
       highest net price.
    */


    const bestMarket =
        calculatedMarkets.reduce(
            function(best, current) {

                return current.net > best.net
                    ? current
                    : best;

            }
        );


    const pune =
        calculatedMarkets[0];


    const extra =
        bestMarket.revenue -
        pune.revenue;


    /*
       Show result
    */


    document
        .getElementById(
            "marketResult"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "bestMarketName"
        )
        .textContent =
        bestMarket.name;


    document
        .getElementById(
            "bestNetPrice"
        )
        .textContent =
        "₹" +
        bestMarket.net.toLocaleString(
            "en-IN"
        ) +
        " / q";


    document
        .getElementById(
            "expectedRevenue"
        )
        .textContent =
        "₹" +
        bestMarket.revenue.toLocaleString(
            "en-IN"
        );


    document
        .getElementById(
            "extraEarning"
        )
        .textContent =
        "+₹" +
        extra.toLocaleString(
            "en-IN"
        );


    /*
       Create comparison cards
    */


    const container =
        document.getElementById(
            "marketCards"
        );


    container.innerHTML = "";


    calculatedMarkets.forEach(
        function(market) {


            const isBest =
                market.name ===
                bestMarket.name;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "market-option" +
                (isBest ? " best" : "");


            card.innerHTML = `

                ${
                    isBest
                    ? `
                        <span class="market-best-label">
                            BEST
                        </span>
                      `
                    : ""
                }

                <h3>
                    ${market.name}
                </h3>

                <p>
                    📍 ${market.distance} km
                </p>

                <div class="market-option-price">

                    ₹${market.net.toLocaleString("en-IN")}/q

                </div>

                <p>
                    Market Price:
                    ₹${market.price.toLocaleString("en-IN")}
                </p>

                <p>
                    Transport:
                    ₹${market.transport}/q
                </p>

                <p>
                    Total Revenue:
                    ₹${market.revenue.toLocaleString("en-IN")}
                </p>

            `;


            container.appendChild(card);

        }
    );

}
/* IoT SENSOR SIMULATOR */


function simulateSensor() {

    const temperature =
        (26 + Math.random() * 7).toFixed(1);


    const humidity =
        Math.floor(
            60 + Math.random() * 25
        );


    document
        .getElementById(
            "temperatureValue"
        )
        .textContent =
        temperature + "°C";


    document
        .getElementById(
            "humidityValue"
        )
        .textContent =
        humidity + "%";


    const temperatureStatus =
        document.getElementById(
            "temperatureStatus"
        );


    const humidityStatus =
        document.getElementById(
            "humidityStatus"
        );


    const condition =
        document.getElementById(
            "storageCondition"
        );


    const recommendation =
        document.getElementById(
            "storageRecommendation"
        );


    /*
       Safe range for this prototype:
       Temperature: 20–32°C
       Humidity: 60–80%
    */


    if (
        temperature > 32 ||
        humidity > 80
    ) {

        temperatureStatus.textContent =
            "● WARNING";


        humidityStatus.textContent =
            "● WARNING";


        temperatureStatus.style.color =
            "#dc2626";


        humidityStatus.style.color =
            "#dc2626";


        condition.style.background =
            "#fef2f2";


        condition.style.borderLeftColor =
            "#dc2626";


        condition.innerHTML = `

            <h2>
                🔴 Storage Alert
            </h2>

            <p>
                Storage conditions require attention.
                Consider improving ventilation or
                moving the produce to a safer location.
            </p>

        `;


        recommendation.textContent =
            "⚠️ Risk detected. Check storage conditions immediately to reduce post-harvest loss.";

    }


    else {

        temperatureStatus.textContent =
            "● Normal";


        humidityStatus.textContent =
            "● Safe";


        temperatureStatus.style.color =
            "#16a34a";


        humidityStatus.style.color =
            "#16a34a";


        condition.style.background =
            "#ecfdf5";


        condition.style.borderLeftColor =
            "#16a34a";


        condition.innerHTML = `

            <h2>
                🟢 Storage Condition Safe
            </h2>

            <p>
                Temperature and humidity are within
                the recommended storage range.
            </p>

        `;


        recommendation.textContent =
            "✅ Current conditions are suitable for storing onions. Continue monitoring temperature and humidity.";

    }


    const now =
        new Date();


    document
        .getElementById(
            "lastUpdated"
        )
        .textContent =
        now.toLocaleTimeString();

}
/* BUYER OFFER SYSTEM */


let selectedBuyer = "";
let selectedOfferPrice = 0;


function viewOffer(
    buyerName,
    price
) {

    selectedBuyer =
        buyerName;


    selectedOfferPrice =
        price;


    document
        .getElementById(
            "offerBuyer"
        )
        .textContent =
        buyerName;


    document
        .getElementById(
            "offerPrice"
        )
        .textContent =
        "₹" +
        price.toLocaleString("en-IN") +
        " / q";


    document
        .getElementById(
            "offerModal"
        )
        .classList.remove(
            "hidden"
        );

}


function closeOffer() {

    document
        .getElementById(
            "offerModal"
        )
        .classList.add(
            "hidden"
        );

}


function acceptBuyerOffer() {

    closeOffer();


    alert(
        "🎉 Offer accepted!\n\n" +
        "Buyer: " +
        selectedBuyer +
        "\n" +
        "Price: ₹" +
        selectedOfferPrice +
        "/q\n\n" +
        "Transaction created successfully."
    );


    /*
       Move automatically
       to Offers section.
    */


    showSectionByName(
        "offers"
    );

}


function showSectionByName(
    sectionName
) {

    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    sections.forEach(
        function(section) {

            section.classList.add(
                "hidden"
            );

        }
    );


    document
        .getElementById(
            sectionName
        )
        .classList.remove(
            "hidden"
        );

}
/* TRANSACTION + LOGISTICS */


function confirmPickup() {

    const button =
        event.target;


    button.textContent =
        "✓ Pickup Confirmed";


    button.style.background =
        "#16a34a";


    const logisticsStatus =
        document.querySelector(
            ".logistics-status"
        );


    logisticsStatus.textContent =
        "✓ Pickup Confirmed";


    logisticsStatus.style.background =
        "#dcfce7";


    logisticsStatus.style.color =
        "#166534";


    const paymentStatus =
        document.getElementById(
            "paymentStatus"
        );


    paymentStatus.textContent =
        "PROCESSING";


    paymentStatus.style.background =
        "#dbeafe";


    paymentStatus.style.color =
        "#1d4ed8";


    document.getElementById(
        "paymentText"
    ).textContent =
        "Produce pickup confirmed. Payment is now being processed.";

}
/* GRIEVANCE SYSTEM */


function submitGrievance() {

    const transaction =
        document.getElementById(
            "grievanceTransaction"
        ).value;


    const type =
        document.getElementById(
            "grievanceType"
        ).value;


    const description =
        document.getElementById(
            "grievanceDescription"
        ).value.trim();


    if (
        transaction === "" ||
        description === ""
    ) {

        alert(
            "Please enter the transaction ID and describe the issue."
        );

        return;

    }


    const status =
        document.getElementById(
            "grievanceStatus"
        );


    status.innerHTML = `

        <div class="grievance-icon">
            !
        </div>

        <div>

            <strong>
                GRV-2026-0042
            </strong>

            <p>
                ${type}
            </p>

            <p>
                Transaction:
                ${transaction}
            </p>

            <span
                class="payment-pending">

                UNDER REVIEW

            </span>

        </div>

    `;


    alert(
        "✅ Grievance submitted successfully.\n\n" +
        "Reference ID: GRV-2026-0042"
    );


    document
        .getElementById(
            "grievanceDescription"
        )
        .value = "";

}
