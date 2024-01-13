export const AJAX = async (url, data = undefined) => {
  try {
    const res = await fetch(
      url,
      data
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        : {}
    );

    if (!res.ok) throw new Error(`Something went wrong! Invalid request (${res.status}).`);

    const jsonRes = await res.json();
    if (jsonRes.status !== 'success') throw new Error(`An error occurred! ${jsonRes.message}`);

    return jsonRes;
  } catch (error) {
    throw error;
  }
};
