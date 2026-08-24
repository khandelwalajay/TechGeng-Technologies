$("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const button = form.querySelector("button");
    const note = $("#contactNote");

    const formData = new FormData(form);

    const enquiry = {
        name: formData.get("name")?.trim(),
        email: formData.get("email")?.trim(),
        phone: formData.get("phone")?.trim(),
        message: formData.get("message")?.trim()
    };

    if (!enquiry.name || !enquiry.email || !enquiry.message) {
        note.textContent = "Please fill all required fields.";
        return;
    }

    if (!db) {
        note.textContent = "Website enquiry system is not configured yet.";
        return;
    }

    button.disabled = true;
    button.textContent = "Submitting...";

    try {
        const { error } = await db
            .from("enquiries")
            .insert([enquiry]);

        if (error) {
            throw error;
        }

        note.textContent =
            "✓ Your enquiry has been submitted successfully. We will contact you soon.";

        note.style.color = "#08a88a";

        form.reset();

    } catch (error) {

        console.error("Enquiry error:", error);

        note.textContent =
            "Sorry, your enquiry could not be submitted. Please try again.";

        note.style.color = "#d64d4d";

    } finally {

        button.disabled = false;
        button.textContent = "Send Enquiry ↗";
    }
});