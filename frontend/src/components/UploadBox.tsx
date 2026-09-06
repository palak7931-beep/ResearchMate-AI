import { useState } from "react";
import api from "../services/api";

type Props = {
  onUploadSuccess: () => void;
};

export default function UploadBox({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadPDF = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    try {
      await api.post("/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Paper uploaded successfully!");

      setFile(null);

      onUploadSuccess();

    } catch (err) {
      console.error(err);

      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div
      className="bg-[#111827] p-6 rounded-xl border border-gray-700 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        Upload Research Paper
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files)
            setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={uploadPDF}
        className="mt-4 bg-blue-600 px-5 py-2 rounded-lg"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}