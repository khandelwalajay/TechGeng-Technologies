/* =========================================================
   TECHTGENG TECHNOLOGIES
   MAIN WEBSITE JAVASCRIPT
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const config = window.TECHTGENG_CONFIG || {};

    const supabaseConfigured =
        config.SUPABASE_URL &&
        !config.SUPABASE_URL.includes("PASTE_") &&
        config.SUPABASE_KEY &&
        !config.SUPABASE_KEY.includes("PASTE_");


    let db = null;


    /* =====================================================
       SUPABASE INITIALIZATION
    ===================================================== */

    if (
        supabaseConfigured &&
        window.supabase &&
        typeof window.supabase.createClient === "function"
    ) {

        db = window.supabase.createClient(
            config.SUPABASE_URL,
            config.SUPABASE_KEY
        );

        console.log("Supabase connected.");

    } else {

        console.warn(
            "Supabase is not configured."
        );

    }


    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function $(selector) {
        return document.querySelector(selector);
    }


    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function formatPrice(price) {

        if (
            price === null ||
            price === undefined ||
            price === ""
        ) {
            return "Contact for price";
        }

        const number = Number(price);

        if (Number.isNaN(number)) {
            return "Contact for price";
        }

        return "₹" + number.toLocaleString("en-IN");

    }


    function setMessage(element, message, type = "") {

        if (!element) {
            return;
        }

        element.textContent = message;

        element.classList.remove(
            "success",
            "error"
        );

        if (type) {
            element.classList.add(type);
        }

    }


    /* =====================================================
       YEAR
    ===================================================== */

    const yearElement = $("#year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = $("#menu");
    const navigation = $("#nav");

    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                navigation.classList.toggle(
                    "open"
                );

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       PRODUCT SYSTEM
    ===================================================== */

    let products = [];


    const demoProducts = [

        {
            id: "demo-1",
            name: "ESP32 Development Board",
            category: "IoT",
            price: 799,
            description:
                "Wi-Fi and Bluetooth development board for connected IoT projects.",
            image_url: "",
            featured: true,
            active: true
        },

        {
            id: "demo-2",
            name: "Arduino UNO R3",
            category: "Arduino",
            price: 599,
            description:
                "Popular microcontroller development board for electronics and automation projects.",
            image_url: "",
            featured: false,
            active: true
        },

        {
            id: "demo-3",
            name: "IoT Sensor Starter Kit",
            category: "IoT",
            price: 1299,
            description:
                "Starter kit for sensor-based monitoring, automation and learning projects.",
            image_url: "",
            featured: true,
            active: true
        },

        {
            id: "demo-4",
            name: "Custom Engineering Project",
            category: "Projects",
            price: null,
            description:
                "Custom electronics, IoT, embedded and engineering project development.",
            image_url: "",
            featured: false,
            active: true
        }

    ];


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const imageHTML =
            product.image_url
                ? `
                    <img
                        src="${escapeHTML(product.image_url)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >
                `
                : `
                    <div class="placeholder">
                        TG
                    </div>
                `;


        const featuredHTML =
            product.featured
                ? `
                    <span class="tag">
                        Featured
                    </span>
                `
                : "";


        return `
            <article class="product-card">

                <div class="product-image">

                    ${imageHTML}

                    ${featuredHTML}

                </div>


                <div class="product-info">

                    <small>
                        ${escapeHTML(
                            product.category ||
                            "Technology"
                        )}
                    </small>


                    <h3>
                        ${escapeHTML(
                            product.name
                        )}
                    </h3>


                    <p>
                        ${escapeHTML(
                            product.description ||
                            "Technology product from TechtGeng."
                        )}
                    </p>


                    <div class="product-bottom">

                        <b>
                            ${formatPrice(
                                product.price
                            )}
                        </b>


                        <a href="#contact">
                            Enquire →
                        </a>

                    </div>

                </div>

            </article>
        `;

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        const productGrid =
            $("#productGrid");

        const empty =
            $("#empty");

        const search =
            $("#search");

        const category =
            $("#category");


        if (!productGrid) {
            return;
        }


        const searchValue =
            search
                ? search.value
                    .trim()
                    .toLowerCase()
                : "";


        const categoryValue =
            category
                ? category.value
                : "";


        const filteredProducts =
            products.filter(
                (product) => {

                    const searchableText = `
                        ${product.name || ""}
                        ${product.category || ""}
                        ${product.description || ""}
                    `.toLowerCase();


                    const searchMatch =
                        !searchValue ||
                        searchableText.includes(
                            searchValue
                        );


                    const categoryMatch =
                        !categoryValue ||
                        product.category ===
                            categoryValue;


                    return (
                        searchMatch &&
                        categoryMatch
                    );

                }
            );


        productGrid.innerHTML =
            filteredProducts
                .map(createProductCard)
                .join("");


        if (empty) {

            empty.classList.toggle(
                "hidden",
                filteredProducts.length > 0
            );

        }

    }


    /* =====================================================
       PRODUCT CATEGORIES
    ===================================================== */

    function populateCategories() {

        const category =
            $("#category");


        if (!category) {
            return;
        }


        const categories =
            [
                ...new Set(
                    products
                        .map(
                            product =>
                                product.category
                        )
                        .filter(Boolean)
                )
            ]
            .sort();


        category.innerHTML =
            `
                <option value="">
                    All categories
                </option>
            ` +
            categories
                .map(
                    (item) =>
                        `
                            <option value="${escapeHTML(item)}">
                                ${escapeHTML(item)}
                            </option>
                        `
                )
                .join("");

    }


    /* =====================================================
       LOAD PRODUCTS
    ===================================================== */

    async function loadProducts() {

        const status =
            $("#productStatus");


        if (!db) {

            products =
                demoProducts;


            if (status) {

                status.textContent =
                    "Connect Supabase to manage live products.";

            }


            populateCategories();
            renderProducts();

            return;

        }


        try {

            const result =
                await db
                    .from("products")
                    .select("*")
                    .eq("active", true)
                    .order(
                        "featured",
                        {
                            ascending: false
                        }
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    );


            if (result.error) {
                throw result.error;
            }


            products =
                result.data || [];


            if (status) {

                if (products.length > 0) {

                    status.textContent =
                        `${products.length} product(s) available.`;

                } else {

                    status.textContent =
                        "Products will appear here soon.";

                }

            }


            populateCategories();
            renderProducts();


        } catch (error) {

            console.error(
                "Product loading error:",
                error
            );


            products =
                demoProducts;


            if (status) {

                status.textContent =
                    "Live products could not be loaded. Showing sample products.";

            }


            populateCategories();
            renderProducts();

        }

    }


    /* =====================================================
       PRODUCT SEARCH
    ===================================================== */

    const searchInput =
        $("#search");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderProducts
        );

    }


    /* =====================================================
       PRODUCT CATEGORY FILTER
    ===================================================== */

    const categorySelect =
        $("#category");


    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            renderProducts
        );

    }


    /* =====================================================
       CONTACT / ENQUIRY FORM
    ===================================================== */

    const contactForm =
        $("#contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {


                /* =========================================
                   STOP PAGE RELOAD
                ========================================= */

                event.preventDefault();
                event.stopPropagation();


                const submitButton =
                    $("#contactSubmit");


                const note =
                    $("#contactNote");


                /* =========================================
                   READ FORM VALUES
                ========================================= */

                const formData =
                    new FormData(
                        contactForm
                    );


                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();


                const email =
                    String(
                        formData.get("email") || ""
                    ).trim();


                const phone =
                    String(
                        formData.get("phone") || ""
                    ).trim();


                const message =
                    String(
                        formData.get("message") || ""
                    ).trim();


                /* =========================================
                   VALIDATION
                ========================================= */

                if (!name) {

                    setMessage(
                        note,
                        "Please enter your name.",
                        "error"
                    );

                    $("#contactName")?.focus();

                    return;

                }


                if (!email) {

                    setMessage(
                        note,
                        "Please enter your email.",
                        "error"
                    );

                    $("#contactEmail")?.focus();

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    setMessage(
                        note,
                        "Please enter a valid email address.",
                        "error"
                    );

                    $("#contactEmail")?.focus();

                    return;

                }


                if (!message) {

                    setMessage(
                        note,
                        "Please enter your requirement or query.",
                        "error"
                    );

                    $("#contactMessage")?.focus();

                    return;

                }


                /* =========================================
                   SUPABASE CHECK
                ========================================= */

                if (!db) {

                    console.error(
                        "Supabase is not connected."
                    );


                    setMessage(
                        note,
                        "The enquiry system is not configured yet. Please try again later.",
                        "error"
                    );

                    return;

                }


                /* =========================================
                   BUTTON LOADING
                ========================================= */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Submitting...";

                }


                setMessage(
                    note,
                    "Submitting your enquiry..."
                );


                /* =========================================
                   DATABASE OBJECT
                ========================================= */

                const enquiry = {

                    name: name,

                    email: email,

                    phone: phone,

                    message: message

                };


                /* =========================================
                   SUBMIT
                ========================================= */

                try {


                    /* =====================================
                       STEP 1
                       SAVE ENQUIRY IN SUPABASE
                    ===================================== */

                    const result =
                        await db
                            .from("enquiries")
                            .insert([
                                enquiry
                            ]);


                    if (result.error) {

                        console.error(
                            "Supabase enquiry error:",
                            result.error
                        );

                        throw result.error;

                    }


                    console.log(
                        "Enquiry successfully saved."
                    );


                    /* =====================================
                       STEP 2
                       SEND EMAIL THROUGH EDGE FUNCTION
                    ===================================== */

                    const {
                        data: emailData,
                        error: emailError
                    } =
                        await db.functions.invoke(
                            "send-enquiry-email",
                            {
                                body: {
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    message: message
                                }
                            }
                        );


                    if (emailError) {

                        console.error(
                            "Email sending error:",
                            emailError
                        );

                        throw emailError;

                    }


                    console.log(
                        "Email sent successfully:",
                        emailData
                    );


                    /* =====================================
                       SUCCESS
                    ===================================== */

                    setMessage(
                        note,
                        "✓ Your enquiry has been submitted successfully. We will contact you soon.",
                        "success"
                    );


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "CONTACT FORM ERROR:",
                        error
                    );


                    let errorMessage =
                        "Something went wrong while submitting your enquiry.";


                    if (
                        error &&
                        error.message
                    ) {

                        console.error(
                            "Detailed error:",
                            error.message
                        );

                    }


                    setMessage(
                        note,
                        errorMessage,
                        "error"
                    );


                } finally {


                    /* =====================================
                       ENABLE BUTTON AGAIN
                    ===================================== */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Send Enquiry ↗";

                    }

                }

            }
        );

    } else {

        console.warn(
            "Contact form #contactForm was not found."
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetID =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetID ||
                            targetID === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetID
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth",
                            block:
                                "start"
                        });

                    }
                );

            }
        );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadProducts();


})();