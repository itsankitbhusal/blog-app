import React from "react";
import Sidebar from "./dashboard/Sidebar";
import BlogStats from "./BlogStats";

const Dashboard = () => {
  return (
    <>
      <main className="w-full h-[90vh] shadow-2xl shadow-gray-300/50 mb-20 flex">
        {/* blog sidebar */}
        <Sidebar />
        <BlogStats />
      </main>
    </>
  );
};

export default Dashboard;
