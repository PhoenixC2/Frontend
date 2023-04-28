import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../logic/api";
import showNotification from "../../logic/notify";
import TypeSwitcher from "./switcher";
import OptionsForm from "../../components/options";
import Modal from "../../components/modal";
import Listener from "./listener";
import { getData } from "../../logic/api";
import { useSearchParams } from "react-router-dom";

export default function Listeners(props) {
  const [currentEditListener, setCurrentEditListener] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchParams] = useSearchParams();

  async function getListeners() {
    const response = await request("listeners/");
    const listenersData = await response.json();
    // modify listeners so .options attributes are on the same level as the rest
    const modifiedListeners = listenersData.listeners.map((listener) => {
      const { options, ...rest } = listener;
      return { ...rest, ...options };
    });
    return modifiedListeners;
  }

  async function createHandleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await request(
      "listeners/add",
      "POST",
      Object.fromEntries(data.entries())
    );
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
    setShowCreateModal(false);
    await getListeners();
  }

  async function editHandleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await request(
      `listeners/${currentEditListener}/edit`,
      "PUT",
      Object.fromEntries(data.entries())
    );
    const responseData = await response.json();
    showNotification(responseData.message, responseData.status);
    setShowEditModal(false);
    await getListeners();
  }

  function EditModal(props) {
    const listener = props.listener;
    // get listener type
    const type = Object.values(listenerTypes).find(
      (type) => type.name === listener.type
    );

    return (
      <>
        <Modal
          id={`edit-modal-${listener.id}`}
          title="Edit listener"
          body={
            <OptionsForm
              type={type}
              handleSubmit={editHandleSubmit}
              element={listener}
            />
          }
          show={showEditModal}
          setShow={setShowEditModal}
        />
      </>
    );
  }

  useEffect(() => {
    if (searchParams.get("listener")) {
      setCurrentEditListener(searchParams.get("listener"));
      setShowEditModal(true);
    }
    else if (searchParams.has("create")) {
      setShowCreateModal(true);
    }
  }, []);

  const { data: listenerTypes } = useQuery(["listenerTypes"], async () => {
    const data = await getData("listeners/available");
    return data.listeners;
  });

  const {
    data: listeners,
    isLoading,
    isError,
  } = useQuery(["listeners"], getListeners, {
    refetchInterval: 10000,
  });


  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th>Active</th>
              <th>Name</th>
              <th>Address</th>
              <th>Port</th>
              <th>Type</th>
              <th>SSL</th>
              <th>Enabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listeners &&
              listeners.length > 0 &&
              listeners.map((listener) => (
                <Listener
                  listener={listener}
                  listeners={listeners}
                  setCurrentEditListener={setCurrentEditListener}
                  setShowEditModal={setShowEditModal}
                  key={listener.id}
                />
              ))}
            {isLoading && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="9">
                  Loading...
                </td>
              </tr>
            )}
            {isError && (
              <tr className="dark-background">
                <td className="text-danger" colSpan="9">
                  Error fetching listeners
                </td>
              </tr>
            )}

            {listeners && listeners.length === 0 && (
              <tr className="dark-background">
                <td className="text-warning" colSpan="9">
                  No listeners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {listenerTypes && Object.keys(listenerTypes).length > 0 && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
            // data-toggle="modal" data-target="#create-modal-before"
          >
            Create a new listener
          </button>
          <Modal
            id="create-modal"
            title="Create a new listener"
            body={
              <TypeSwitcher
                types={listenerTypes}
                name="Listener Types"
                description="Select the type of listener you want to create."
                handleSubmit={() => createHandleSubmit}
              />
            }
            show={showCreateModal}
            setShow={setShowCreateModal}
          />
        </>
      )}
      {listeners &&
        listenerTypes &&
        listeners.map((listener) => (
          <EditModal listener={listener} key={listener.id} />
        ))}
    </>
  );
}
