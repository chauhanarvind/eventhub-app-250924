import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UniEventCard = ({ eventId }: { eventId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/uni-events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Event deleted successfully");
        router.push("/uni-events");
      } else {
        const data = await res.json();
        alert(`Failed to delete event: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while deleting the event.");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete Event
      </button>
    </div>
  );
};

export default UniEventCard;
