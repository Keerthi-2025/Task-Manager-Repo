import React from "react";

function UserCard({ userInfo }) {
  return (
    <div className="user-card p-4 rounded-2xl bg-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
            src={userInfo?.profileImageUrl || "/default-avatar.png"}
            alt="User Avatar"
          />

          <div>
            <p className="text-sm font-medium text-gray-800">{userInfo?.name}</p>
            <p className="text-sm text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
}

export default UserCard;

// ✅ Fixed StatCard Component
const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-100";
      case "Completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-violet-600 bg-violet-100";
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg ${getStatusTagColor()} text-[12px] font-medium`}
    >
      <span className="text-base font-semibold">{count}</span>
      <span>{label}</span>
    </div>
  );
};
