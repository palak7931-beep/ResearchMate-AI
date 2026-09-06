import UploadBox from "../components/UploadBox";
import { useEffect, useState } from "react";
import api from "../services/api";
import ChatBox from "../components/ChatBox";
import ReactMarkdown from "react-markdown";

interface Paper {
  id: number;
  filename: string;
  summary: string;
}

const Dashboard = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const [comparePapers, setComparePapers] = useState<number[]>([]);
  const [comparison, setComparison] = useState("");

  const [literatureReview, setLiteratureReview] = useState("");
  const [generatingReview, setGeneratingReview] = useState(false);

  const [researchGap, setResearchGap] = useState("");
  const [generatingGap, setGeneratingGap] = useState(false);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await api.get("/papers/");
      setPapers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE PAPER
  const deletePaper = async (paperId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paper?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/papers/${paperId}`);

      if (selectedPaper?.id === paperId) {
        setSelectedPaper(null);
      }

      setComparePapers((ids) =>
        ids.filter((id) => id !== paperId)
      );

      await fetchPapers();

      alert("✅ Paper deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete paper.");
    }
  };

  // SELECT / UNSELECT PAPER
  const toggleCompare = (paperId: number) => {
    if (comparePapers.includes(paperId)) {
      setComparePapers(
        comparePapers.filter((id) => id !== paperId)
      );
      return;
    }

    setComparePapers([...comparePapers, paperId]);
  };

  // COMPARE - EXACTLY 2 PAPERS
  const compareSelected = async () => {
    if (comparePapers.length !== 2) {
      alert("Please select exactly 2 papers.");
      return;
    }

    try {
      const res = await api.post("/compare/", {
        paper1_id: comparePapers[0],
        paper2_id: comparePapers[1],
      });

      setComparison(res.data.comparison);

      setLiteratureReview("");
      setResearchGap("");
    } catch (err) {
      console.error(err);
      alert("Comparison failed.");
    }
  };

  // LITERATURE REVIEW - 1 OR MORE PAPERS
  const generateLiteratureReview = async () => {
    if (comparePapers.length < 1) {
      alert("Please select at least 1 paper.");
      return;
    }

    setGeneratingReview(true);

    try {
      const res = await api.post("/literature/", {
        paper_ids: comparePapers,
      });

      setLiteratureReview(res.data.literature_review);

      setComparison("");
      setResearchGap("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate literature review.");
    } finally {
      setGeneratingReview(false);
    }
  };

  // RESEARCH GAP - 1 OR MORE PAPERS
  const generateResearchGap = async () => {
    if (comparePapers.length < 1) {
      alert("Please select at least 1 paper.");
      return;
    }

    setGeneratingGap(true);

    try {
      const res = await api.post("/research-gap/", {
        paper_ids: comparePapers,
      });

      setResearchGap(res.data.research_gap);

      setComparison("");
      setLiteratureReview("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate research gap.");
    } finally {
      setGeneratingGap(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-8 md:px-10 md:py-10">

      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
              🧠
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                ResearchOS AI
              </h1>

              <p className="text-gray-400 mt-1">
                Your intelligent research workspace
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          AI-powered research analysis
        </div>

      </div>

      {/* UPLOAD SECTION */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
        
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Add Research Papers
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Upload PDF papers to summarize, analyze, compare and discover research gaps.
          </p>
        </div>

        <UploadBox onUploadSuccess={fetchPapers} />

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3 mt-6">

        <button
        onClick={compareSelected}
        className="group bg-green-600 hover:bg-green-500 px-5 py-3 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/20"
      >
        <span className="mr-2">🚀</span>
        Compare Papers
      </button>

      <button
        onClick={generateLiteratureReview}
        disabled={generatingReview}
        className="group bg-purple-600 hover:bg-purple-500 px-5 py-3 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        <span className="mr-2">📚</span>
        {generatingReview
          ? "Generating..."
          : "Literature Review"}
      </button>

      <button
        onClick={generateResearchGap}
        disabled={generatingGap}
        className="group bg-orange-600 hover:bg-orange-500 px-5 py-3 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        <span className="mr-2">💡</span>
        {generatingGap
          ? "Finding Gaps..."
          : "Research Gaps"}
      </button>

      </div>

      {/* SELECTION INFO */}
      {/* STATS CARDS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 max-w-2xl">

  {/* TOTAL PAPERS */}
  <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
    <p className="text-gray-400 text-sm">
      📄 Total Papers
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {papers.length}
    </h2>

    <p className="text-gray-500 text-sm mt-2">
      Research papers in workspace
    </p>
  </div>

  {/* SELECTED PAPERS */}
  <div className="bg-[#111827] border border-gray-700 rounded-xl p-6">
    <p className="text-gray-400 text-sm">
      ☑ Selected Papers
    </p>

    <h2 className="text-4xl font-bold mt-2">
      {comparePapers.length}
    </h2>

    <p className="text-gray-500 text-sm mt-2">
      Ready for AI analysis
    </p>
  </div>

</div>

{/* SELECTION INFO */}
<p className="text-gray-400 mt-5">
  {comparePapers.length === 0
    ? "Select papers using the checkboxes below."
    : `${comparePapers.length} paper${
        comparePapers.length > 1 ? "s" : ""
      } selected`}
</p>

      {/* PAPER CARDS */}
      {/* PAPER CARDS */}
<div className="grid md:grid-cols-2 gap-6 mt-8">

  {papers.length === 0 ? (
    <div className="md:col-span-2 bg-[#111827] border border-gray-700 rounded-xl p-10 text-center">
      
      <div className="text-5xl mb-4">
        📄
      </div>

      <h2 className="text-2xl font-semibold">
        No research papers yet
      </h2>

      <p className="text-gray-400 mt-2">
        Upload your first research paper to start analyzing it with AI.
      </p>

    </div>
  ) : (
    papers.map((paper) => (
      <div
  key={paper.id}
  onClick={() => setSelectedPaper(paper)}
  className={`group rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
    selectedPaper?.id === paper.id
      ? "bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/10"
      : "bg-[#111827] border-gray-800 hover:border-gray-600 hover:bg-[#151e2e] hover:-translate-y-1"
  }`}
>

        {/* CHECKBOX */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={comparePapers.includes(paper.id)}
            onClick={(e) => e.stopPropagation()}
            onChange={() => toggleCompare(paper.id)}
            className="w-4 h-4"
          />

          <span className="text-sm text-gray-400">
            Select for comparison
          </span>
        </div>

        {/* PAPER NAME */}
        <div className="flex items-start justify-between gap-4">
  <div className="flex items-center gap-3 min-w-0">
    <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center text-xl shrink-0">
      📄
    </div>

    <div className="min-w-0">
      <h2 className="text-lg font-semibold truncate">
        {paper.filename}
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Research Paper
      </p>
    </div>
  </div>

  {comparePapers.includes(paper.id) && (
    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
      Selected
    </span>
  )}
</div>

        {/* SUMMARY */}
        <p className="text-gray-400 mt-4 line-clamp-6">
          {paper.summary}
        </p>

        {/* DELETE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deletePaper(paper.id);
          }}
          className="mt-6 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 px-4 py-2 rounded-lg text-sm transition-all"
        >
          🗑 Delete
        </button>

      </div>
    ))
  )}

</div>

      {/* SELECTED PAPER + CHAT */}
      {selectedPaper && (
        <div className="mt-10 bg-[#111827] rounded-xl p-6 border border-gray-700">

          <h2 className="text-2xl font-bold mb-2">
            {selectedPaper.filename}
          </h2>

          <p className="text-gray-400 mb-6">
            {selectedPaper.summary}
          </p>

          <ChatBox paperId={selectedPaper.id} />

        </div>
      )}

      {/* COMPARISON RESULT */}
      {comparison && (
        <div className="mt-10 bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">
              📊
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Paper Comparison
              </h2>
              <p className="text-sm text-gray-500">
                AI-powered comparative analysis
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="comparison-content">
              <ReactMarkdown>
                {comparison}
              </ReactMarkdown>
            </div>
          </div>

        </div>
      )}

      {/* LITERATURE REVIEW RESULT */}
      {literatureReview && (
        <div className="mt-10 bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl">
              📚
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Literature Review
              </h2>
              <p className="text-sm text-gray-500">
                AI-generated synthesis of selected research
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="comparison-content">
              <ReactMarkdown>
                {literatureReview}
              </ReactMarkdown>
            </div>
          </div>

        </div>
      )}

      {/* RESEARCH GAP RESULT */}
      {researchGap && (
        <div className="mt-10 bg-[#111827] rounded-2xl border border-gray-800 overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl">
              💡
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Research Gap Analysis
              </h2>
              <p className="text-sm text-gray-500">
                AI-identified opportunities for future research
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="comparison-content">
              <ReactMarkdown>
                {researchGap}
              </ReactMarkdown>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Dashboard;