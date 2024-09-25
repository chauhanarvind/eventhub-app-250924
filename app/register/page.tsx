"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface formData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture: File | null;
  address: string;
  gender: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<formData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    profilePicture: null,
    address: "",
    gender: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username cannot contain spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be alphanumeric, include at least 1 special character, and be between 8-16 characters without spaces";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (
      formData.dateOfBirth &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)
    ) {
      newErrors.dateOfBirth = "Date of Birth must be in YYYY-MM-DD format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("fullName", formData.fullName);
      formDataToSubmit.append("username", formData.username);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("confirmPassword", formData.confirmPassword);
      formDataToSubmit.append("phoneNumber", formData.phoneNumber);
      formDataToSubmit.append("dateOfBirth", formData.dateOfBirth);
      formDataToSubmit.append("address", formData.address);
      formDataToSubmit.append("gender", formData.gender);
      if (formData.profilePicture) {
        formDataToSubmit.append("profilePicture", formData.profilePicture);
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: formDataToSubmit,
        });

        if (res.ok) {
          setOtpSent(true);
        } else {
          const data = await res.json();
          setErrors({ server: data.message });
        }
      } catch (error) {
        setErrors({ server: "An error occurred while registering." });
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (res.ok) {
        const data = await res.json();
        Cookies.set("token", data.token, { expires: 1 });
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setErrors({ server: data.message });
      }
    } catch (error) {
      setErrors({ server: "Failed to verify OTP." });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {!otpSent ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            {errors.fullName && <p>{errors.fullName}</p>}
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div>
            <label>Phone Number (Optional)</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>

          <div>
            <label>Date of Birth (Optional)</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
            {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label>Profile Picture (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profilePicture: e.target.files?.[0] || null,
                })
              }
            />
          </div>

          <div>
            <label>Address (Optional)</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div>
            <label>Gender (Optional)</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit">Register</button>
          {errors.server && <p>{errors.server}</p>}
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <h3>Enter the OTP sent to your email</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button type="submit">Verify OTP</button>
          {errors.server && <p>{errors.server}</p>}
        </form>
      )}
    </div>
  );
}
