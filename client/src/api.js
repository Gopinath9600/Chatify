export const fetchResponse = async (chat) => {
  try {
    const response = await fetch("https://chatify-bpu6.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat.map((message) => message.message).join("\n"),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching response:", error.message);
  }
};
