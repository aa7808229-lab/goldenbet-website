import { useMemo, useState } from "react";

const initialUsers = [
  {
    id: "user-001",
    username: "golden_user",
    fullName: "Golden User",
    country: "Iraq",
    phone: "",
    balance: 250000,
    status: "Active",
  },
  {
    id: "user-002",
    username: "kurdistan_user",
    fullName: "Kurdistan User",
    country: "Iraq",
    phone: "",
    balance: 85000,
    status: "Active",
  },
];

const initialAdmins = [
  {
    id: "admin-001",
    username: "admin",
    name: "GoldenBet Admin",
    country: "Iraq",
    status: "Active",
  },
];

const initialPaymentMethods = [
  "Zain Cash",
  "Asiacell",
  "Korek",
  "FIB",
  "FastPay",
  "Qi Card",
  "Visa",
  "Mastercard",
];

const initialCountries = [
  { name: "Iraq", currency: "IQD", enabled: true },
  { name: "Turkey", currency: "TRY", enabled: true },
  { name: "Iran", currency: "IRR", enabled: true },
  { name: "Saudi Arabia", currency: "SAR", enabled: true },
  { name: "United Arab Emirates", currency: "AED", enabled: true },
  { name: "Qatar", currency: "QAR", enabled: true },
  { name: "Kuwait", currency: "KWD", enabled: true },
  { name: "Jordan", currency: "JOD", enabled: true },
  { name: "Egypt", currency: "EGP", enabled: true },
  { name: "Germany", currency: "EUR", enabled: true },
  { name: "France", currency: "EUR", enabled: true },
  { name: "Italy", currency: "EUR", enabled: true },
  { name: "Spain", currency: "EUR", enabled: true },
  { name: "United Kingdom", currency: "GBP", enabled: true },
  { name: "USA", currency: "USD", enabled: true },
  { name: "Canada", currency: "CAD", enabled: true },
  { name: "Australia", currency: "AUD", enabled: true },
  { name: "Brazil", currency: "BRL", enabled: true },
  { name: "Japan", currency: "JPY", enabled: true },
  { name: "South Korea", currency: "KRW", enabled: true },
  { name: "China", currency: "CNY", enabled: true },
  { name: "India", currency: "INR", enabled: true },
];

const initialTransactions = [
  {
    id: "dep-001",
    type: "Deposit",
    username: "golden_user",
    country: "Iraq",
    amount: 100000,
    method: "Zain Cash",
    status: "Pending",
    date: "2026-10-04",
  },
  {
    id: "dep-002",
    type: "Deposit",
    username: "kurdistan_user",
    country: "Iraq",
    amount: 50000,
    method: "FastPay",
    status: "Approved",
    date: "2026-10-03",
  },
  {
    id: "wd-001",
    type: "Withdrawal",
    username: "golden_user",
    country: "Iraq",
    amount: 25000,
    method: "Zain Cash",
    status: "Pending",
    date: "2026-10-04",
  },
];

const formatMoney = (amount, currency = "IQD") => {
  return `${Number(amount || 0).toLocaleString()} ${currency}`;
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [users, setUsers] = useState(initialUsers);
  const [admins, setAdmins] = useState(initialAdmins);
  const [countries, setCountries] = useState(initialCountries);
  const [transactions, setTransactions] =
    useState(initialTransactions);

  const [selectedUser, setSelectedUser] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceAction, setBalanceAction] = useState("add");

  const [showAdminForm, setShowAdminForm] =
    useState(false);

  const [newAdmin, setNewAdmin] = useState({
    username: "",
    name: "",
    country: "Iraq",
  });

  const [searchUser, setSearchUser] = useState("");
  const [transactionFilter, setTransactionFilter] =
    useState("All");

  const totalUsers = users.length;

  const totalBalance = useMemo(() => {
    return users.reduce(
      (total, user) =>
        total + Number(user.balance || 0),
      0
    );
  }, [users]);

  const pendingDeposits = useMemo(() => {
    return transactions.filter(
      (item) =>
        item.type === "Deposit" &&
        item.status === "Pending"
    ).length;
  }, [transactions]);

  const pendingWithdrawals = useMemo(() => {
    return transactions.filter(
      (item) =>
        item.type === "Withdrawal" &&
        item.status === "Pending"
    ).length;
  }, [transactions]);

  const filteredUsers = useMemo(() => {
    const search = searchUser
      .trim()
      .toLowerCase();

    if (!search) {
      return users;
    }

    return users.filter((user) =>
      [
        user.username,
        user.fullName,
        user.country,
        user.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [users, searchUser]);

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === "All") {
      return transactions;
    }

    return transactions.filter(
      (item) => item.type === transactionFilter
    );
  }, [transactions, transactionFilter]);

  const addBalance = () => {
    if (!selectedUser) {
      return;
    }

    const amount = Number(balanceAmount);

    if (!amount || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== selectedUser.id) {
          return user;
        }

        const currentBalance = Number(
          user.balance || 0
        );

        const newBalance =
          balanceAction === "add"
            ? currentBalance + amount
            : Math.max(
                0,
                currentBalance - amount
              );

        return {
          ...user,
          balance: newBalance,
        };
      })
    );

    setSelectedUser(null);
    setBalanceAmount("");
  };

  const toggleCountry = (countryName) => {
    setCountries((currentCountries) =>
      currentCountries.map((country) =>
        country.name === countryName
          ? {
              ...country,
              enabled: !country.enabled,
            }
          : country
      )
    );
  };

  const createAdmin = () => {
    if (
      !newAdmin.username.trim() ||
      !newAdmin.name.trim()
    ) {
      alert("Please enter admin username and name.");
      return;
    }

    const admin = {
      id: `admin-${Date.now()}`,
      username: newAdmin.username.trim(),
      name: newAdmin.name.trim(),
      country: newAdmin.country,
      status: "Active",
    };

    setAdmins((currentAdmins) => [
      ...currentAdmins,
      admin,
    ]);

    setNewAdmin({
      username: "",
      name: "",
      country: "Iraq",
    });

    setShowAdminForm(false);
  };

  const toggleAdmin = (adminId) => {
    setAdmins((currentAdmins) =>
      currentAdmins.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              status:
                admin.status === "Active"
                  ? "Disabled"
                  : "Active",
            }
          : admin
      )
    );
  };

  const updateTransactionStatus = (
    transactionId,
    status
  ) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              status,
            }
          : transaction
      )
    );
  };

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: "📊",
    },
    {
      id: "countries",
      label: "Countries",
      icon: "🌍",
    },
    {
      id: "users",
      label: "Users",
      icon: "👥",
    },
    {
      id: "admins",
      label: "Admins",
      icon: "👑",
    },
    {
      id: "balance",
      label: "Balance",
      icon: "💰",
    },
    {
      id: "deposits",
      label: "Deposits",
      icon: "💳",
    },
    {
      id: "withdrawals",
      label: "Withdrawals",
      icon: "💸",
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: "📈",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  const renderOverview = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <span>👥</span>
            <div>
              <small>Total Users</small>
              <strong>{totalUsers}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>💰</span>
            <div>
              <small>Total Balance</small>
              <strong>
                {formatMoney(totalBalance)}
              </strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>💳</span>
            <div>
              <small>Pending Deposits</small>
              <strong>{pendingDeposits}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>💸</span>
            <div>
              <small>Pending Withdrawals</small>
              <strong>{pendingWithdrawals}</strong>
            </div>
          </div>
        </div>

        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <h2>GoldenBet Admin</h2>
              <p>
                Manage users, countries, payments and
                platform settings.
              </p>
            </div>

            <span className="admin-status-badge">
              System Online
            </span>
          </div>

          <div className="admin-overview-grid">
            <div>
              <strong>{admins.length}</strong>
              <span>Admins</span>
            </div>

            <div>
              <strong>
                {
                  countries.filter(
                    (country) => country.enabled
                  ).length
                }
              </strong>
              <span>Active Countries</span>
            </div>

            <div>
              <strong>
                {initialPaymentMethods.length}
              </strong>
              <span>Payment Methods</span>
            </div>
          </div>
        </div>

        <div className="admin-section-card">
          <h2>Security</h2>

          <p className="admin-security-note">
            This dashboard currently demonstrates the
            admin interface. Real balance changes,
            deposits, withdrawals and administrator
            permissions must be protected by Supabase
            Row Level Security and a secure backend.
          </p>
        </div>
      </div>
    );
  };

  const renderCountries = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <h2>Countries</h2>
              <p>
                Enable or disable countries supported by
                GoldenBet.
              </p>
            </div>
          </div>

          <div className="admin-country-list">
            {countries.map((country) => (
              <div
                className="admin-country-row"
                key={country.name}
              >
                <div>
                  <strong>{country.name}</strong>
                  <span>{country.currency}</span>
                </div>

                <button
                  type="button"
                  className={
                    country.enabled
                      ? "admin-toggle active"
                      : "admin-toggle"
                  }
                  onClick={() =>
                    toggleCountry(country.name)
                  }
                >
                  {country.enabled
                    ? "Enabled"
                    : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <h2>Users</h2>
              <p>
                Search and manage GoldenBet users.
              </p>
            </div>

            <input
              type="search"
              className="admin-search"
              placeholder="Search users..."
              value={searchUser}
              onChange={(event) =>
                setSearchUser(event.target.value)
              }
            />
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.country}</td>
                    <td>
                      {formatMoney(user.balance)}
                    </td>
                    <td>
                      <span className="admin-status-badge">
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="admin-action-button"
                        onClick={() =>
                          setSelectedUser(user)
                        }
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <button
                type="button"
                className="admin-modal-close"
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                ×
              </button>

              <h2>
                {selectedUser.username}
              </h2>

              <p>
                Current balance:{" "}
                <strong>
                  {formatMoney(
                    selectedUser.balance
                  )}
                </strong>
              </p>

              <label>
                Action
                <select
                  value={balanceAction}
                  onChange={(event) =>
                    setBalanceAction(
                      event.target.value
                    )
                  }
                >
                  <option value="add">
                    Add Balance
                  </option>
                  <option value="remove">
                    Remove Balance
                  </option>
                </select>
              </label>

              <label>
                Amount
                <input
                  type="number"
                  min="0"
                  value={balanceAmount}
                  onChange={(event) =>
                    setBalanceAmount(
                      event.target.value
                    )
                  }
                  placeholder="Amount"
                />
              </label>

              <button
                type="button"
                className="admin-primary-button"
                onClick={addBalance}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAdmins = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <h2>Administrators</h2>
              <p>
                Manage GoldenBet administrator accounts.
              </p>
            </div>

            <button
              type="button"
              className="admin-primary-button"
              onClick={() =>
                setShowAdminForm(
                  !showAdminForm
                )
              }
            >
              {showAdminForm
                ? "Close"
                : "Add Admin"}
            </button>
          </div>

          {showAdminForm && (
            <div className="admin-form">
              <input
                type="text"
                placeholder="Username"
                value={newAdmin.username}
                onChange={(event) =>
                  setNewAdmin({
                    ...newAdmin,
                    username:
                      event.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Full Name"
                value={newAdmin.name}
                onChange={(event) =>
                  setNewAdmin({
                    ...newAdmin,
                    name: event.target.value,
                  })
                }
              />

              <select
                value={newAdmin.country}
                onChange={(event) =>
                  setNewAdmin({
                    ...newAdmin,
                    country:
                      event.target.value,
                  })
                }
              >
                {countries.map((country) => (
                  <option
                    key={country.name}
                    value={country.name}
                  >
                    {country.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="admin-primary-button"
                onClick={createAdmin}
              >
                Create Admin
              </button>
            </div>
          )}

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.username}</td>
                    <td>{admin.name}</td>
                    <td>{admin.country}</td>
                    <td>{admin.status}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-action-button"
                        onClick={() =>
                          toggleAdmin(admin.id)
                        }
                      >
                        {admin.status ===
                        "Active"
                          ? "Disable"
                          : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderBalance = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <h2>Balance Management</h2>

          <p>
            Select a user from the Users page to manage
            the demo balance.
          </p>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() =>
              setActivePage("users")
            }
          >
            Open Users
          </button>
        </div>
      </div>
    );
  };

  const renderTransactions = (type) => {
    const list = filteredTransactions.filter(
      (transaction) =>
        transaction.type === type
    );

    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <div className="admin-section-header">
            <div>
              <h2>{type}s</h2>
              <p>
                Review and manage {type.toLowerCase()}
                requests.
              </p>
            </div>

            <select
              value={transactionFilter}
              onChange={(event) =>
                setTransactionFilter(
                  event.target.value
                )
              }
            >
              <option value="All">All</option>
              <option value="Deposit">
                Deposits
              </option>
              <option value="Withdrawal">
                Withdrawals
              </option>
            </select>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Country</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {list.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      {transaction.username}
                    </td>

                    <td>
                      {transaction.country}
                    </td>

                    <td>
                      {formatMoney(
                        transaction.amount
                      )}
                    </td>

                    <td>
                      {transaction.method}
                    </td>

                    <td>
                      {transaction.status}
                    </td>

                    <td>
                      {transaction.status ===
                        "Pending" && (
                        <div className="admin-action-group">
                          <button
                            type="button"
                            className="admin-action-button"
                            onClick={() =>
                              updateTransactionStatus(
                                transaction.id,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="admin-action-button danger"
                            onClick={() =>
                              updateTransactionStatus(
                                transaction.id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="admin-empty"
                    >
                      No {type.toLowerCase()} requests
                      found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderRevenue = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <span>📈</span>
            <div>
              <small>Total Revenue</small>
              <strong>0 IQD</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>🎯</span>
            <div>
              <small>Betting Revenue</small>
              <strong>0 IQD</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <span>🎰</span>
            <div>
              <small>Casino Revenue</small>
              <strong>0 IQD</strong>
            </div>
          </div>
        </div>

        <div className="admin-section-card">
          <h2>Revenue</h2>
          <p>
            Revenue analytics will be connected to the
            real database and transaction system later.
          </p>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="admin-page-content">
        <div className="admin-section-card">
          <h2>Platform Settings</h2>

          <div className="admin-settings-list">
            <div>
              <strong>Platform Name</strong>
              <span>GoldenBet</span>
            </div>

            <div>
              <strong>Default Currency</strong>
              <span>IQD</span>
            </div>

            <div>
              <strong>Payment Methods</strong>
              <span>
                {initialPaymentMethods.length}
              </span>
            </div>

            <div>
              <strong>Supported Countries</strong>
              <span>
                {
                  countries.filter(
                    (country) =>
                      country.enabled
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="admin-section-card">
          <h2>Security</h2>

          <p className="admin-security-note">
            Never place Supabase service-role keys,
            payment provider secret keys or other private
            credentials in frontend code.
          </p>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return renderOverview();

      case "countries":
        return renderCountries();

      case "users":
        return renderUsers();

      case "admins":
        return renderAdmins();

      case "balance":
        return renderBalance();

      case "deposits":
        return renderTransactions(
          "Deposit"
        );

      case "withdrawals":
        return renderTransactions(
          "Withdrawal"
        );

      case "revenue":
        return renderRevenue();

      case "settings":
        return renderSettings();

      default:
        return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>G</span>

          <div>
            <strong>GOLDENBET</strong>
            <small>SUPER ADMIN</small>
          </div>
        </div>

        <nav className="admin-navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                activePage === item.id
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() =>
                setActivePage(item.id)
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span>GoldenBet</span>
          <small>Admin Panel</small>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>
              {
                navigation.find(
                  (item) =>
                    item.id === activePage
                )?.label
              }
            </h1>

            <p>
              GoldenBet administration panel
            </p>
          </div>

          <div className="admin-topbar-status">
            <span className="admin-online-dot" />
            Online
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}
