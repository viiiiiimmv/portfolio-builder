import React from "react";

function FormButton({ label, loading }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Please wait..." : label}
    </button>
  );
}

export default FormButton;
