"use client";
import { useState } from "react";

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

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    // Full Name Validation
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    // Username Validation (no spaces allowed)
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username cannot contain spaces";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password Validation (alphanumeric, at least 1 special character, length between 8-16)
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be alphanumeric, include at least 1 special character, and be between 8-16 characters without spaces";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone Number Validation (optional)
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    // Date of Birth Validation (optional, assuming date of birth is in YYYY-MM-DD format)
    if (
      formData.dateOfBirth &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)
    ) {
      newErrors.dateOfBirth = "Date of Birth must be in YYYY-MM-DD format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log(formData);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Full Name */}
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

        {/* Username */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        {/* Phone Number (optional) */}
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

        {/* Date of Birth (optional) */}
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

        {/* Profile Picture (optional) */}
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

        {/* Address (optional) */}
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

        {/* Gender (optional) */}
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
      </form>
    </div>
  );
}
