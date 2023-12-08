import axios from "axios";
import React, { useEffect, useState } from "react";
function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async accountId => {
    const answer = prompt("Write yes to delete this account");
    if (answer === "yes" || answer === "YES") {
      try {
        setIsLoading(true);
        const response = await axios.delete(`api/credentials/${accountId}`);
        if (!response) {
          setIsLoading(false);
          setError(true);
          return;
        }
        setAccounts(accounts.filter(account => account._id !== accountId));
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get("api/credentials");
        if (!response) {
          setIsLoading(false);
          setError(true);
          return;
        }
        setAccounts(response.data);
        setError(false);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="relative h-full flex flex-col items-center">
      {isLoading && (
        <div className="absolute h-20">
          <img className="w-20" src="/loading.gif" alt="loading" />
        </div>
      )}
      <div className="flex flex-col p-3 py-6 items-center w-full h-full space-y-4 text-slate-600">
        {error && <div className="text-red-500 font-bold text-lg">Error</div>}
        {accounts.length > 0 && (
          <>
            <h1 className="text-xl font-bold">Accounts</h1>
            <table className="table-auto w-full max-w-[40rem]">
              <thead className="border ">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Password</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, i) => {
                  return (
                    <tr
                      key={account.email}
                      className={`${i % 2 && "bg-gray-100"}`}
                    >
                      <td className="border px-4 py-2">{account.email}</td>
                      <td className="border px-4 py-2">{account.password}</td>
                      <td className="border text-center">
                        {i !== 0 && (
                          <button
                            className="text-red-500"
                            onClick={() => deleteAccount(account._id)}
                          >
                            🗑
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Accounts;
