import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

const UpdateUniEvent = ({
  eventId,
  initialData,
}: {
  eventId: string;
  initialData: any;
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/uni-events/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Event updated successfully");
        router.push("/uni-events");
      } else {
        const data = await res.json();
        alert(`Failed to update event: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while updating the event.");
    }
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        className="mb-2 p-2 border"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="mb-2 p-2 border"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Event Date"
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Event Location"
        className="mb-2 p-2 border"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Event Price"
        className="mb-2 p-2 border"
      />
      <input
        type="url"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Event Link"
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Event Category"
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Event Image URL"
        className="mb-2 p-2 border"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Event
      </button>
    </div>
  );
};

export default UpdateUniEvent;
