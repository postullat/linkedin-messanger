import { Button } from "@/components/ui/Button";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export const NoAccessPage = () => {

  const handleClickOpen = () => {
    window.open("https://www.linkedin.com/messaging", "_blank");
  };

  return (
    <section className="flex flex-col items-center justify-center h-full gap-6 text-center p-6 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <Linkedin className="w-16 h-16 text-blue-600" />
        <h1 className="font-bold text-2xl text-gray-800">
          Hello! Please visit LinkedIn
        </h1>
        <p className="text-gray-500 max-w-sm">
          To continue using the application, you need to open the LinkedIn messaging page. 
          Once opened, your session will be updated automatically.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button
          onClick={handleClickOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all"
        >
          <Linkedin className="w-5 h-5" />
          Open LinkedIn
        </Button>
      </motion.div>
    </section>
  );
};
