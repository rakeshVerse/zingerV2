const AJAX = async (url, data = undefined) => {
  try {
    const res = await fetch(
      url,
      data
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        : {}
    );

    if (!res.ok) throw new Error(`Something went wrong! Invalid request (${res.status}).`);

    const jsonRes = await res.json();
    if (jsonRes.status !== "success") throw new Error(`An error occurred! ${jsonRes.message}`);

    return jsonRes;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {HTML element} element Element in which you want to show the message
 * @param {String} msg Message to display
 * @param {String} color Message color
 */
const showInfo = (element, msg, className = "info") => {
  element.classList.remove("hidden-info");
  element.textContent = msg;
  element.className = `${element.classList[0]} ${className}`;
};
