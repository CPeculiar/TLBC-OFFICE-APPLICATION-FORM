import React, { useState } from "react";
import emailjs from "emailjs-com";

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    church: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.church.trim()) errors.church = "Name of Church is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setIsSuccess(false); // Reset success state

      try {
        const response = await emailjs.send(
          "service_9y9qd0r",
          "template_cywtduf",
          {
            to_email: "chukwudipeculiar@gmail.com",
            from_name: formData.name,
            from_phone: formData.phone,
            from_email: formData.email,
            church: formData.church,
            message: formData.message,
          },
          "G0uRp4jJwwELDgewX"
        );

        if (response.status === 200) {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            phone: "",
            email: "",
            church: "",
            message: "",
          });
          setIsSuccess(true);
        } else {
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false); // Reset submitting state
      }
    } else {
      setFormErrors(errors);
      setIsSubmitting(false); // Reset submitting state in case of validation errors
    }
  };

  return (
    <div className="support-form" style={{marginTop: '70px'}}>
      
      <form action="#" method="post" role="form" onSubmit={handleSubmit}>
      <h3 style={{ color: "black"}}>Support</h3>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            className="form-control"
            placeholder="Full name"
            required
          />
          {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}
        </div>

        <div className="col-lg-12 col-md-6 col-12">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            pattern="[^ @]*@[^ @]*"
                            className="form-control"
                            placeholder="Email address"
                            required
                          />
                          {formErrors.email && (
                            <p style={{ color: "red" }}>{formErrors.email}</p>
                          )}
                        </div>

        <div className="col-lg-12 col-md-6 col-12">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            id="phone"
                            className="form-control"
                            placeholder="Phone number"
                            required
                          />
                          {formErrors.phone && (
                            <p style={{ color: "red" }}>{formErrors.phone}</p>
                          )}
                        </div>
                        <div className="col-lg-12 col-md-6 col-12 mb-4">
                  <input
                    type="text"
                    name="church"
                    id="church"
                    value={formData.church}
                    onChange={handleChange}
                    placeholder="Church"
                    required
                  />
                  {formErrors.church && (
                    <p style={{ color: "red" }}>{formErrors.email}</p>
                  )}
                </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
            className="form-control"
             placeholder="Type your message"
            required
          ></textarea>
           {formErrors.message && (
                        <p style={{ color: "red" }}>{formErrors.church}</p>
                  )}
        </div>
        <button type="submit" className="btn form-control"
        disabled={isSubmitting}
        style={{  fontWeight: "bolder", backgroundColor: '#EE5007', color: 'white' }}
        >

{isSubmitting ? "Submitting..." : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default SupportForm;
