import React, { useEffect, useState } from "react";

async function GetFavs() {
  let result: any = [];

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return result;
    }

    const response = await fetch(
      "http://ec2-34-229-185-121.compute-1.amazonaws.com/getfav",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();

    result = data.events || [];
    return result;
  } catch (err: any) {
    console.log(err);
    throw new Error("an error occured");
  }
}

export default GetFavs;
