import Link from "next/link";

export default function CompetitionsPage() {
  const competitions = [
    {
      id: "flash-tattoo",
      title: "Flash Tattoo Registration",
      category: "Art / Ink",
      description: "Upcoming Event",
      status: "UPCOMING",
      path: "#",
      color: "blue"
    },
    {
      id: "live-painting",
      title: "Live Painting",
      category: "Visual Art",
      description: "Include Kopi + Canvas",
      inc: "Cat, Kuas, dan Pensil dapat digunakan selama kegiatan berlangsung.",
      status: "25K",
      path: "/dashboard/pendaftaran/live-painting",
      color: "green"
    }
  ];
 

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Keterlibatan</h1>
        {/* <p className="text-gray-600">Pilih kategori event yang ingin Anda ikuti di bawah ini.</p> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className={`h-2 w-full bg-${comp.color}-500`}></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${comp.color}-50 text-${comp.color}-700 border border-${comp.color}-100`}>
                  {comp.category}
                </span>
                <span className="px-3 py-1 rounded-full text-lg font-bold bg-green-50 text-green-700 border border-green-100">
                  {comp.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{comp.title}</h2>
              <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                <span className="text-lg font-extrabold">{comp.description}</span><br/>
                <i>{comp.inc}</i></p>
              
              <Link 
                href={comp.path}
                className={`mt-auto inline-block px-5 py-3 text-sm font-bold rounded-full bg-${comp.color}-600 text-white hover:bg-${comp.color}-700 transition-all ${comp.path === "#" ? "cursor-not-allowed opacity-50" : ""}`}
                
              >
                {comp.path === "#" ? "Segera Hadir" : "Daftar Sekarang →"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}