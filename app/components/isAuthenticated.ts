import "dotenv/config";

async function isAuthenticated() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const response = await fetch(
      "http://ec2-34-229-185-121.compute-1.amazonaws.com/verifyToken",
      {
        method: "POST", // or 'POST', 'PUT', etc.
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.valid) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default isAuthenticated;
