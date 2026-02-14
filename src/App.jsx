import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import roseImage from "./assets/Rosa3.jpeg"; // Imagen local
import audioFile from "./assets/audio.mp3"; // Audio local

export default function App() {
  const [opened, setOpened] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [petals, setPetals] = useState([]);
  const audioRef = useRef(null);

  // Generar corazones flotantes
  useEffect(() => {
    if (opened) {
      const heartInterval = setInterval(() => {
        const id = Math.random().toString(36).substr(2, 9);
        setHearts((prev) => [
          ...prev,
          { id, left: Math.random() * 90 + "%", size: Math.random() * 24 + 16 },
        ]);
      }, 800);
      return () => clearInterval(heartInterval);
    }
  }, [opened]);

  // Generar pétalos cayendo
  useEffect(() => {
    if (opened) {
      const petalInterval = setInterval(() => {
        const id = Math.random().toString(36).substr(2, 9);
        setPetals((prev) => [
          ...prev,
          { id, left: Math.random() * 90 + "%", rotate: Math.random() * 360 },
        ]);
      }, 1000);
      return () => clearInterval(petalInterval);
    }
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => console.log("Audio iniciado"))
        .catch((e) => console.log("Error al reproducir audio:", e));
    }
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} loop src={audioFile} />

      <AnimatePresence>
        <motion.div
          key="card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={styles.card}
        >
          {!opened ? (
            <>
              <h1
                style={{
                  ...styles.title,
                  color: "#ff007f",
                  fontStyle: "italic",
                }}
              >
                💖 Feliz San Valentín 💖
              </h1>
              <p
                style={{
                  ...styles.text,
                  color: "#ff007f",
                  fontStyle: "italic",
                }}
              >
                Un mensaje especial para ti Solange...
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={styles.button}
                onClick={handleOpen}
              >
                Abrir Carta 💌
              </motion.button>
            </>
          ) : (
            <>
              <h2 style={styles.subtitle}>Mi Solanchita ❤️</h2>
              <p style={styles.message}>
                Son tiempos difíciles pero te amo en cualquier circunstancia. Un
                día todo será mejor y espero que sea pronto. Mi mayor dolor es
                verte triste y mi mayor felicidad es verte feliz! No son solo
                palabras.
              </p>

              {/* Rosa local */}
              <motion.img
                src={roseImage}
                alt="Rosa"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                style={{ width: "80px", marginTop: "20px", borderRadius: "15px" }}
              />

              <div style={{ fontSize: "35px", marginTop: "15px" }}>✨💞✨</div>
            </>
          )}

          {/* Corazones flotando */}
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -800, opacity: 0, scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: heart.left,
                fontSize: heart.size,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              ❤️
            </motion.div>
          ))}

          {/* Pétalos cayendo */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ y: -50, opacity: 0.8, rotate: 0 }}
              animate={{ y: 700, opacity: 0, rotate: petal.rotate }}
              transition={{ duration: 8, ease: "linear" }}
              style={{
                position: "absolute",
                left: petal.left,
                fontSize: 24,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              🌸
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffc0cb, #ff6f91)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "25px",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    boxShadow: "0px 15px 50px rgba(0,0,0,0.3)",
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontSize: "28px",
  },
  subtitle: {
    color: "#d81b60",
    fontSize: "24px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    lineHeight: "1.6",
    fontStyle: "italic",
    color: "#c2185b",
  },
  button: {
    backgroundColor: "#e91e63",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
