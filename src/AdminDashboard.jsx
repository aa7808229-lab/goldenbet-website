import React, { useMemo, useState } from "react";

const initialUsers = [
  {
    id: 1,
    username: "golden_user_01",
    phone: "+9647500000000",
    country: "Iraq",
    region: "Kurdistan",
    balance: 250000,
    status: "Active",
  },
  {
    id: 2,
    username: "golden_user_02",
    phone: "+9647700000000",
    country: "Iraq",
    region: "Kurdistan",
    balance: 85000,
    status: "Active",
  },
];

const initialAdmins = [
  {
    id: 1,
    name: "Kurdistan Admin",
    phone: "+9647500000000",
    country: "Iraq",
    region: "Kurdistan",
    status: "Active",
  },
];

const paymentMethods = [
  "Korek",
  "Zain",
  "Zain Cash",
  "Asiacell",
  "FIB",
  "FastPay",
  "Qi Card",
  "Bank / Card",
];

function money(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [users, setUsers] = useState(initialUsers);
  const [admins, setAdmins] = useState(initialAdmins);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceAction, setBalanceAction] = useState("add");
  const [countryEnabled, setCountryEnabled] = useState(true);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    phone: "",
    country: "Iraq",
    region: "Kurdistan",
  });

  const totalBalance = useMemo(
    () => users.reduce((sum, user) => sum + user.balance, 0),
    [users]
  );

  const addBalance = () => {
    if (!selectedUser) return;

    const amount = Number(balanceAmount);

    if (!amount || amount <= 0) return;

    setUsers((current) =>
      current.map((user) => {
        if (user.id !== selectedUser.id) return user;

        return {
          ...user,
          balance:
            balanceAction === "add"
              ? user.balance + amount
              : Math.max(0, user.balance - amount),
        };
      })
    );

    setSelectedUser(null);
    setBalanceAmount("");
  };

  const createAdmin = () => {
    if (!newAdmin.name || !newAdmin.phone) return;

    setAdmins((current) => [
      ...current,
      {
        id: Date.now(),
        ...newAdmin,
        status: "Active",
      },
    ]);

    setNewAdmin({
      name: "",
      phone: "",
      country: "Iraq",
      region: "Kurdistan",
    });

    setShowAdminForm(false);
  };

  const disableAdmin = (id) => {
    setAdmins((current) =>
      current.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              status: admin.status === "Active" ? "Disabled" : "Active",
            }
          : admin
      )
    );
  };

  const menu = [
    ["overview", "📊", "Overview"],
    ["countries", "🌍", "Countries"],
    ["users", "👥", "All Users"],
    ["admins", "🛡️", "Country Admins"],
    ["balance", "💰", "Balance Management"],
    ["deposits", "📥", "Deposits"],
    ["withdrawals", "📤", "Withdrawals"],
    ["revenue", "📈", "Revenue"],
    ["settings", "⚙️", "Admin Settings"],
  ];

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <div className="admin-logo">GOLDEN<span>BET</span></div>
          <div className="admin-subtitle">SUPER ADMIN PANEL</div>
        </div>

        <div className="admin-header-right">
          <span className="admin-country">🌍 Global</span>
          <span className="admin-role">👑 Super Admin</span>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {menu.map(([id, icon, label]) => (
            <button
              key={id}
              className={activePage === id ? "admin-menu active" : "admin-menu"}
              onClick={() => setActivePage(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}

          <div className="admin-sidebar-bottom">
            <div className="admin-security">
              🔐
              <div>
                <strong>Secure Mode</strong>
                <small>Super Admin</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="admin-content">
          {activePage === "overview" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Super Admin Dashboard</h1>
                  <p>Manage GoldenBet globally.</p>
                </div>
                <span className="admin-live">● SYSTEM ONLINE</span>
              </div>

              <div className="admin-cards">
                <div className="admin-stat">
                  <span>👥</span>
                  <small>Total Users</small>
                  <strong>{users.length}</strong>
                </div>

                <div className="admin-stat">
                  <span>🌍</span>
                  <small>Active Countries</small>
                  <strong>1</strong>
                </div>

                <div className="admin-stat">
                  <span>💰</span>
                  <small>Total User Balance</small>
                  <strong>{money(totalBalance)} IQD</strong>
                </div>

                <div className="admin-stat">
                  <span>🛡️</span>
                  <small>Country Admins</small>
                  <strong>{admins.length}</strong>
                </div>
              </div>

              <div className="admin-grid-two">
                <section className="admin-panel">
                  <div className="admin-panel-head">
                    <h2>Countries</h2>
                    <button
                      className="gold-button"
                      onClick={() => setActivePage("countries")}
                    >
                      Manage
                    </button>
                  </div>

                  <div className="country-card">
                    <div className="country-flag">🇮🇶</div>
                    <div>
                      <strong>Iraq</strong>
                      <small>Kurdistan Region</small>
                    </div>

                    <div className="country-status">
                      <span className={countryEnabled ? "status-on" : "status-off"}>
                        {countryEnabled ? "Active" : "Disabled"}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="admin-panel">
                  <div className="admin-panel-head">
                    <h2>Revenue Overview</h2>
                    <button
                      className="gold-button"
                      onClick={() => setActivePage("revenue")}
                    >
                      View
                    </button>
                  </div>

                  <div className="period-grid">
                    <div>
                      <small>Today</small>
                      <strong>0 IQD</strong>
                    </div>
                    <div>
                      <small>This Week</small>
                      <strong>0 IQD</strong>
                    </div>
                    <div>
                      <small>This Month</small>
                      <strong>0 IQD</strong>
                    </div>
                    <div>
                      <small>Total</small>
                      <strong>0 IQD</strong>
                    </div>
                  </div>
                </section>
              </div>

              <section className="admin-panel">
                <div className="admin-panel-head">
                  <h2>Payment Methods — Iraq / Kurdistan</h2>
                </div>

                <div className="payment-method-grid">
                  {paymentMethods.map((method) => (
                    <div className="payment-method" key={method}>
                      <span>💳</span>
                      <strong>{method}</strong>
                      <small>Available</small>
                    </div>
                  ))}
                </div>
              </section>

              <div className="admin-notice">
                <strong>🔐 Security Notice</strong>
                <p>
                  Balance changes, deposits, withdrawals and real-money
                  transactions must be processed through a secure backend
                  ledger. This dashboard UI does not replace server-side
                  authorization.
                </p>
              </div>
            </>
          )}

          {activePage === "countries" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Countries</h1>
                  <p>Manage countries and regional access.</p>
                </div>
                <button
                  className="gold-button"
                  onClick={() => setCountryEnabled(!countryEnabled)}
                >
                  {countryEnabled ? "Disable Iraq" : "Enable Iraq"}
                </button>
              </div>

              <section className="admin-panel">
                <div className="admin-table">
                  <div className="admin-table-head">
                    <span>Country</span>
                    <span>Region</span>
                    <span>Currency</span>
                    <span>Status</span>
                  </div>

                  <div className="admin-table-row">
                    <span>🇮🇶 Iraq</span>
                    <span>Kurdistan</span>
                    <span>IQD</span>
                    <span>
                      <b className={countryEnabled ? "status-on" : "status-off"}>
                        {countryEnabled ? "Active" : "Disabled"}
                      </b>
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}

          {activePage === "users" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>All Users</h1>
                  <p>Users are separated by country.</p>
                </div>
              </div>

              <section className="admin-panel">
                <div className="admin-table">
                  <div className="admin-table-head">
                    <span>User</span>
                    <span>Phone</span>
                    <span>Country</span>
                    <span>Balance</span>
                    <span>Status</span>
                  </div>

                  {users.map((user) => (
                    <div className="admin-table-row" key={user.id}>
                      <span>{user.username}</span>
                      <span>{user.phone}</span>
                      <span>🇮🇶 {user.country}</span>
                      <span>{money(user.balance)} IQD</span>
                      <span>
                        <b className="status-on">{user.status}</b>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "admins" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Country Admins</h1>
                  <p>Only the Super Admin can create or disable country admins.</p>
                </div>

                <button
                  className="gold-button"
                  onClick={() => setShowAdminForm(!showAdminForm)}
                >
                  + Add Country Admin
                </button>
              </div>

              {showAdminForm && (
                <section className="admin-panel">
                  <h2>Create Country Admin</h2>

                  <div className="admin-form">
                    <input
                      placeholder="Admin name"
                      value={newAdmin.name}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          name: e.target.value,
                        })
                      }
                    />

                    <input
                      placeholder="Phone number"
                      value={newAdmin.phone}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          phone: e.target.value,
                        })
                      }
                    />

                    <select
                      value={newAdmin.country}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          country: e.target.value,
                        })
                      }
                    >
                      <option>Iraq</option>
                    </select>

                    <select
                      value={newAdmin.region}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          region: e.target.value,
                        })
                      }
                    >
                      <option>Kurdistan</option>
                    </select>

                    <button className="gold-button" onClick={createAdmin}>
                      Create Admin
                    </button>
                  </div>
                </section>
              )}

              <section className="admin-panel">
                <div className="admin-table">
                  <div className="admin-table-head">
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Country</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  {admins.map((admin) => (
                    <div className="admin-table-row" key={admin.id}>
                      <span>{admin.name}</span>
                      <span>{admin.phone}</span>
                      <span>🇮🇶 {admin.country}</span>
                      <span>
                        <b
                          className={
                            admin.status === "Active"
                              ? "status-on"
                              : "status-off"
                          }
                        >
                          {admin.status}
                        </b>
                      </span>
                      <button
                        className="danger-button"
                        onClick={() => disableAdmin(admin.id)}
                      >
                        {admin.status === "Active" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activePage === "balance" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Balance Management</h1>
                  <p>Manage user balances by authorized admin action.</p>
                </div>
              </div>

              <section className="admin-panel">
                <h2>Select User</h2>

                <div className="user-picker">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      className={
                        selectedUser?.id === user.id
                          ? "user-option selected"
                          : "user-option"
                      }
                      onClick={() => setSelectedUser(user)}
                    >
                      <strong>{user.username}</strong>
                      <small>{money(user.balance)} IQD</small>
                    </button>
                  ))}
                </div>

                {selectedUser && (
                  <div className="balance-editor">
                    <h3>{selectedUser.username}</h3>

                    <p>
                      Current balance:{" "}
                      <strong>{money(selectedUser.balance)} IQD</strong>
                    </p>

                    <div className="balance-actions">
                      <button
                        className={
                          balanceAction === "add"
                            ? "gold-button"
                            : "secondary-button"
                        }
                        onClick={() => setBalanceAction("add")}
                      >
                        + Add
                      </button>

                      <button
                        className={
                          balanceAction === "remove"
                            ? "gold-button"
                            : "secondary-button"
                        }
                        onClick={() => setBalanceAction("remove")}
                      >
                        − Remove
                      </button>
                    </div>

                    <input
                      type="number"
                      min="1"
                      placeholder="Amount in IQD"
                      value={balanceAmount}
                      onChange={(e) => setBalanceAmount(e.target.value)}
                    />

                    <button className="gold-button" onClick={addBalance}>
                      Confirm Balance Change
                    </button>
                  </div>
                )}
              </section>
            </>
          )}

          {activePage === "deposits" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Deposits</h1>
                  <p>Review deposit requests by country.</p>
                </div>
              </div>

              <section className="admin-panel empty-panel">
                <div>📥</div>
                <h2>No deposits yet</h2>
                <p>
                  Real deposit requests will appear here after the secure
                  payment backend is connected.
                </p>
              </section>
            </>
          )}

          {activePage === "withdrawals" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Withdrawals</h1>
                  <p>Review withdrawal requests by country.</p>
                </div>
              </div>

              <section className="admin-panel empty-panel">
                <div>📤</div>
                <h2>No withdrawals yet</h2>
                <p>
                  Withdrawal requests will appear here after the secure
                  backend is connected.
                </p>
              </section>
            </>
          )}

          {activePage === "revenue" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Revenue</h1>
                  <p>Global revenue reporting.</p>
                </div>
              </div>

              <div className="revenue-grid">
                <div className="revenue-card">
                  <small>Daily</small>
                  <strong>0 IQD</strong>
                </div>

                <div className="revenue-card">
                  <small>Weekly</small>
                  <strong>0 IQD</strong>
                </div>

                <div className="revenue-card">
                  <small>Monthly</small>
                  <strong>0 IQD</strong>
                </div>

                <div className="revenue-card">
                  <small>Yearly</small>
                  <strong>0 IQD</strong>
                </div>

                <div className="revenue-card total-revenue">
                  <small>Total Revenue</small>
                  <strong>0 IQD</strong>
                </div>
              </div>

              <section className="admin-panel">
                <h2>Country Revenue</h2>

                <div className="admin-table">
                  <div className="admin-table-head">
                    <span>Country</span>
                    <span>Daily</span>
                    <span>Weekly</span>
                    <span>Monthly</span>
                    <span>Total</span>
                  </div>

                  <div className="admin-table-row">
                    <span>🇮🇶 Iraq</span>
                    <span>0 IQD</span>
                    <span>0 IQD</span>
                    <span>0 IQD</span>
                    <span>0 IQD</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {activePage === "settings" && (
            <>
              <div className="admin-title-row">
                <div>
                  <h1>Admin Settings</h1>
                  <p>Global GoldenBet administration settings.</p>
                </div>
              </div>

              <section className="admin-panel">
                <h2>Super Admin</h2>

                <div className="settings-row">
                  <span>Role</span>
                  <strong>Super Admin</strong>
                </div>

                <div className="settings-row">
                  <span>Access</span>
                  <strong>Global</strong>
                </div>

                <div className="settings-row">
                  <span>Active Country</span>
                  <strong>Iraq / Kurdistan</strong>
                </div>

                <div className="settings-row">
                  <span>Currency</span>
                  <strong>IQD</strong>
                </div>
              </section>

              <div className="admin-notice">
                <strong>⚠️ Production Security</strong>
                <p>
                  Before accepting real money, connect authentication,
                  database Row Level Security, server-side balance ledger,
                  payment verification, audit logs and required licensing /
                  compliance controls.
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
