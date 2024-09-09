import React from "react";

const ContactPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2c3e50, #34495e)",
        color: "#ecf0f1",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#34495e",
          color: "#ecf0f1",
          padding: "20px",
          textAlign: "center",
        }}>
        <h1>Contact Us</h1>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}>
        <div
          style={{
            display: "flex",
            maxWidth: "1200px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            overflow: "hidden",
            backgroundColor: "#2c3e50",
          }}>
          {/* Left Side Contact Info */}
          <div
            style={{
              flex: 1,
              padding: "30px",
              borderRight: "1px solid #34495e",
            }}>
            <h2 style={{ color: "#ecf0f1" }}>Contact Information</h2>
            <div style={{ marginBottom: "20px" }}>
              <h3>Address</h3>
              <p>1234 Street Name, City, Country</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>
                <a
                  href="mailto:support@example.com"
                  style={{ color: "#1abc9c" }}>
                  support@example.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <div
            style={{
              flex: 1,
              padding: "30px",
            }}>
            <h2 style={{ color: "#ecf0f1" }}>Send Us a Message</h2>
            <form>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="name"
                  style={{ display: "block", marginBottom: "5px" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #34495e",
                    backgroundColor: "#34495e",
                    color: "#ecf0f1",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", marginBottom: "5px" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #34495e",
                    backgroundColor: "#34495e",
                    color: "#ecf0f1",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="subject"
                  style={{ display: "block", marginBottom: "5px" }}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #34495e",
                    backgroundColor: "#34495e",
                    color: "#ecf0f1",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="message"
                  style={{ display: "block", marginBottom: "5px" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #34495e",
                    backgroundColor: "#34495e",
                    color: "#ecf0f1",
                  }}
                  required></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#1abc9c",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#34495e",
          color: "#ecf0f1",
          padding: "10px",
          textAlign: "center",
        }}>
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default ContactPage;
