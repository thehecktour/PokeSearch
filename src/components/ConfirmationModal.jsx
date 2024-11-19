/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  pokemonName,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50"
          onClick={onCancel}
        >
          <motion.div
            key="confirmation-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="mt-56 w-96 rounded-xl bg-zinc-800 p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl text-zinc-200">
              Are you sure you want to view details for{" "}
              <span className="font-semibold capitalize text-zinc-100">
                {pokemonName}
              </span>
              ?
            </h2>
            <p className="mb-6 text-zinc-400">Other pokémon will be lost.</p>
            <div className="flex justify-between gap-3 text-lg">
              <button
                onClick={onCancel}
                className="rounded-lg bg-zinc-700 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-lg bg-blue-600 px-4 py-2 text-zinc-100 transition-colors hover:bg-blue-500"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
