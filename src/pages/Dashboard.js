const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12 transition-all duration-300">
      <div className="text-center max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-300 mb-6">
          🚚 Shipment Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Welcome! Use the sidebar to create a new shipment or track your deliveries.
          This dashboard helps you <span className="font-semibold text-blue-600 dark:text-blue-400">manage and monitor</span> shipments easily.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;


