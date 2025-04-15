import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeIcon,
  MusicIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  MicIcon,
  PaletteIcon,
  ShirtIcon,
  CakeIcon,
  CheckIcon,
} from "lucide-react";
import './App.css';

export default function CulturalDayForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    willAttend: "",
    willParticipate: "",
    selected_activities: [],
    additionalInfo: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    toast.info(`Option ${name} sélectionnée: ${value}`, {
      position: "top-center",
      duration: 2000
    });
  };

  const handleCheckboxChange = (activity) => {
    setFormData((prev) => {
      const updatedActivities = prev.selected_activities.includes(activity)
        ? prev.selected_activities.filter((a) => a !== activity)
        : [...prev.selected_activities, activity];
      
      toast.info(
        `Activité ${activity} ${updatedActivities.includes(activity) ? 'sélectionnée' : 'désélectionnée'}`,
        {
          position: "top-center",
          duration: 1500,
          icon: updatedActivities.includes(activity) ? <CheckIcon size={16} /> : undefined
        }
      );
      
      return { ...prev, selected_activities: updatedActivities };
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast.warning("Informations requises", {
        description: "Veuillez remplir votre nom et votre email pour continuer",
        position: "top-center",
      });
      return;
    }
    if (step === 2 && !formData.willAttend) {
      toast.warning("Confirmation requise", {
        description: "Veuillez indiquer si vous serez présent à l'événement",
        position: "top-center",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.name || !formData.email || !formData.willAttend) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      const submissionData = {
        ...formData,
        selected_activities: formData.selected_activities.join(', ')
      };
      //////Oumar

      const response = await fetch('https://backendjournee-v9qj.vercel.app/api/inscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success("Inscription confirmée", {
          description: "Votre participation a bien été enregistrée. Un email de confirmation vous sera envoyé.",
          position: "top-center",
          duration: 5000,
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          willAttend: "",
          willParticipate: "",
          selected_activities: [],
          additionalInfo: "",
        });
        setStep(1);
      } else {
        throw new Error(data.message || "Erreur lors du traitement de votre inscription");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      toast.error("Inscription échouée", {
        description: error.message || "Une erreur est survenue lors de l'envoi du formulaire.",
        position: "top-center",
        duration: 5000,
        action: {
          label: "Réessayer",
          onClick: () => handleSubmit(e),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("inscription-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const isActivitySelected = (activity) => {
    return formData.selected_activities.includes(activity);
  };

  return (
    <div className="cultural-day-container">
    {/* Hero Section */}
    <section className="hero-section">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="hero-overlay"
      />
      <div className="hero-content">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-title"
        >
          Journée Culturelle a SUPEMIR
        </motion.h1>
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Célébrons ensemble la richesse et la diversité des cultures  lors d'une journée
          exceptionnelle d'échanges, de découvertes et de partage organiser par l'ecole superieur multimedia informatique et reseaux (SUPEMIR).
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-buttons"
        >
          <button
            onClick={scrollToForm}
            className="primary-button"
          >
            Je souhaite participer
          </button>
          <button className="secondary-button">
            En savoir plus
          </button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-info"
        >
          <div className="info-item">
            <CalendarIcon className="info-icon" />
            <span>11 Mai 2025</span>
          </div>
          <div className="info-item">
            <ClockIcon className="info-icon" />
            <span>10h - 18h</span>
          </div>
          <div className="info-item">
            <MapPinIcon className="info-icon" />
            <span>Supemir</span>
          </div>
        </motion.div>
      </div>
    </section>
    {/* About Section */}
    <section className="about-section">
      <div className="about-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">À propos de l'événement</h2>
          <div className="section-divider"></div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="about-content"
        >
          <p>
            La Journée Culturelle  est un événement annuel qui rassemble des personnes de toutes
            origines pour célébrer la diversité culturelle qui enrichit notre société. Cette journée offre une
            plateforme unique pour découvrir, partager et apprécier les traditions, la cuisine, la musique, la danse
            et l'art de différentes cultures du monde entier.
          </p>
          <p>
            Que vous soyez participant ou simple visiteur, vous aurez l'occasion de vous immerger dans un
            environnement multiculturel vibrant, d'élargir vos horizons et de créer des liens avec des personnes
            partageant votre passion pour la diversité culturelle.
          </p>
          <p>
            Nous vous invitons à participer activement à cet événement en présentant votre propre culture ou
            simplement en venant découvrir celles des autres. Ensemble, célébrons ce qui nous rend uniques et ce qui
            nous unit.
          </p>
        </motion.div>
      </div>
    </section>
    {/* Activities Section */}
    <section className="activities-section">
      <div className="activities-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Nos Activités</h2>
          <p className="section-description">
            Découvrez les nombreuses activités proposées lors de notre journée culturelle et choisissez celles
            auxquelles vous souhaitez participer.
          </p>
          <div className="section-divider"></div>
        </motion.div>
        <div className="activities-grid">
          {/* Activity 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <ShirtIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Défilés Traditionnels</h3>
              </div>
              <div className="card-content">
                <p>
                  Présentez les costumes traditionnels de votre pays lors d'un défilé coloré et festif. Partagez
                  l'histoire et la signification de ces tenues avec le public et contribuez à la richesse visuelle de
                  notre événement.
                </p>
                <div className="activity-info">
              
                </div>
              </div>
            </div>
          </motion.div>
          {/* Activity 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <GlobeIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Présentations par Pays</h3>
              </div>
              <div className="card-content">
                <p>
                  Partagez l'histoire, la culture et les traditions de votre pays d'origine à travers une présentation
                  interactive. Utilisez des photos, des vidéos et des objets pour illustrer votre exposé et répondez aux
                  questions du public.
                </p>
                <div className="activity-info">
                 
                </div>
              </div>
            </div>
          </motion.div>
          {/* Activity 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <MusicIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Danses Traditionnelles</h3>
              </div>
              <div className="card-content">
                <p>
                  Montrez les danses traditionnelles de votre culture sur scène. Que ce soit en solo, en duo ou en
                  groupe, partagez les mouvements, les rythmes et les significations qui caractérisent les danses de
                  votre pays.
                </p>
                <div className="activity-info">
               
                </div>
              </div>
            </div>
          </motion.div>
          {/* Activity 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <CakeIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Stands Culinaires</h3>
              </div>
              <div className="card-content">
                <p>
                  Préparez et présentez des plats traditionnels de votre pays pour le concours culinaire. Faites
                  découvrir les saveurs uniques de votre cuisine et partagez les recettes et les histoires derrière ces
                  plats.
                </p>
                <div className="activity-info">
                
                </div>
              </div>
            </div>
          </motion.div>
          {/* Activity 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <MicIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Chant & Musique</h3>
              </div>
              <div className="card-content">
                <p>
                  Interprétez des chansons traditionnelles ou modernes de votre pays. Que ce soit a cappella ou avec
                  accompagnement musical, partagez les mélodies et les paroles qui résonnent avec votre culture.
                </p>
                <div className="activity-info">
                 
                </div>
              </div>
            </div>
          </motion.div>
          {/* Activity 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="activity-card">
              <div className="card-header-bar"></div>
              <div className="card-header">
                <div className="card-icon">
                  <PaletteIcon className="activity-icon" />
                </div>
                <h3 className="card-title">Slam & Poésie</h3>
              </div>
              <div className="card-content">
                <p>
                  Exprimez-vous à travers la poésie ou le slam dans votre langue maternelle ou en français. Partagez vos
                  émotions, vos réflexions et votre vision du monde à travers les mots et la performance orale.
                </p>
                <div className="activity-info">
                  
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
      <section id="inscription-form" className="form-section">
        <div className="form-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Formulaire d'Inscription</h2>
            <div className="section-divider"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="form-card">
              <div className="card-content">
                <div className="progress-container">
                  <div className="progress-info">
                    <span className="progress-step">
                      Étape {step} sur {formData.willAttend === "non" ? 2 : formData.willParticipate === "oui" ? 3 : 2}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${step === 1 ? 33 : step === 2 ? 66 : 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="form-step"
                    >
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="name">
                            Nom complet <span className="required">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Votre nom complet"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">
                            Email <span className="required">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="votre@email.com"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">
                            Téléphone
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Votre numéro de téléphone"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="country">
                            Pays d'origine
                          </label>
                          <input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Votre pays d'origine"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="form-step"
                    >
                      <div className="radio-group">
                        <label className="radio-label">Serez-vous présent(e) à l'événement? <span className="required">*</span></label>
                        <div className="radio-options">
                          <div className="radio-option">
                            <input
                              type="radio"
                              id="attend-yes"
                              name="willAttend"
                              value="oui"
                              checked={formData.willAttend === "oui"}
                              onChange={() => handleRadioChange("willAttend", "oui")}
                            />
                            <label htmlFor="attend-yes">
                              Oui, je serai présent(e)
                            </label>
                          </div>
                          <div className="radio-option">
                            <input
                              type="radio"
                              id="attend-no"
                              name="willAttend"
                              value="non"
                              checked={formData.willAttend === "non"}
                              onChange={() => handleRadioChange("willAttend", "non")}
                            />
                            <label htmlFor="attend-no">
                              Non, je ne pourrai pas venir
                            </label>
                          </div>
                        </div>
                      </div>
                      {formData.willAttend === "oui" && (
                        <div className="radio-group">
                          <label className="radio-label">
                            Souhaitez-vous participer à une ou plusieurs activités?
                          </label>
                          <div className="radio-options">
                            <div className="radio-option">
                              <input
                                type="radio"
                                id="participate-yes"
                                name="willParticipate"
                                value="oui"
                                checked={formData.willParticipate === "oui"}
                                onChange={() => handleRadioChange("willParticipate", "oui")}
                              />
                              <label htmlFor="participate-yes">
                                Oui, je souhaite participer
                              </label>
                            </div>
                            <div className="radio-option">
                              <input
                                type="radio"
                                id="participate-no"
                                name="willParticipate"
                                value="non"
                                checked={formData.willParticipate === "non"}
                                onChange={() => handleRadioChange("willParticipate", "non")}
                              />
                              <label htmlFor="participate-no">
                                Non, je préfère être spectateur
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="additionalInfo">
                          Informations supplémentaires (optionnel)
                        </label>
                        <textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          placeholder="Avez-vous des besoins particuliers ou des questions?"
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="form-step"
                    >
                      <div className="form-section-box">
                        <h3 className="form-section-title">Participation aux activités</h3>
                        
                        {formData.selected_activities.length > 0 && (
                          <div className="selected-activities-feedback">
                            <span className="selected-count">
                              {formData.selected_activities.length} activité(s) sélectionnée(s)
                            </span>
                          </div>
                        )}
                        
                        <div className="activities-checkbox-grid">
                          <div className={`checkbox-card ${isActivitySelected("défilé") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-parade"
                                checked={isActivitySelected("défilé")}
                                onChange={() => handleCheckboxChange("défilé")}
                              />
                              {isActivitySelected("défilé") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-parade">
                                Défilé traditionnel
                              </label>
                            </div>
                          </div>
                          
                          <div className={`checkbox-card ${isActivitySelected("présentation") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-presentation"
                                checked={isActivitySelected("présentation")}
                                onChange={() => handleCheckboxChange("présentation")}
                              />
                              {isActivitySelected("présentation") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-presentation">Présentation par pays</label>
                            </div>
                          </div>
                          
                          <div className={`checkbox-card ${isActivitySelected("danse") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-dance"
                                checked={isActivitySelected("danse")}
                                onChange={() => handleCheckboxChange("danse")}
                              />
                              {isActivitySelected("danse") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-dance">Danses traditionnelles</label>
                            </div>
                          </div>
                          
                          <div className={`checkbox-card ${isActivitySelected("cuisine") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-food"
                                checked={isActivitySelected("cuisine")}
                                onChange={() => handleCheckboxChange("cuisine")}
                              />
                              {isActivitySelected("cuisine") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-food">Stand culinaire</label>
                            </div>
                          </div>
                          
                          <div className={`checkbox-card ${isActivitySelected("chant") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-singing"
                                checked={isActivitySelected("chant")}
                                onChange={() => handleCheckboxChange("chant")}
                              />
                              {isActivitySelected("chant") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-singing">Chant</label>
                            </div>
                          </div>
                          
                          <div className={`checkbox-card ${isActivitySelected("slam") ? "selected" : ""}`}>
                            <div className="checkbox-container">
                              <input
                                type="checkbox"
                                id="activity-slam"
                                checked={isActivitySelected("slam")}
                                onChange={() => handleCheckboxChange("slam")}
                              />
                              {isActivitySelected("slam") && (
                                <CheckIcon className="check-icon" />
                              )}
                            </div>
                            <div className="checkbox-content">
                              <label htmlFor="activity-slam">
                                Slam / Poésie
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
              
              <div className="card-footer">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="back-button"
                  >
                    <ChevronLeftIcon className="button-icon" />
                    Retour
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 &&
                !(step === 2 && formData.willAttend === "non") &&
                !(step === 2 && formData.willParticipate === "non") ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="next-button"
                    disabled={(step === 1 && (!formData.name || !formData.email)) || (step === 2 && !formData.willAttend)}
                  >
                    Suivant
                    <ChevronRightIcon className="button-icon" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Soumettre"}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="footer-column"
          >
            <h3 className="footer-title">Journée Culturelle</h3>
            <p className="footer-text">
              Célébrons ensemble la richesse et la diversité des cultures du monde entier.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="footer-column"
          >
            <h3 className="footer-title">Contact</h3>
            <p className="footer-text">Email: contact@journeeculturelle.org</p>
            <p className="footer-text">Téléphone: +33 1 23 45 67 89</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="footer-column"
          >
            <h3 className="footer-title">Lieu</h3>
            <p className="footer-text">Centre Culturel International</p>
            <p className="footer-text">123 Avenue de la Diversité</p>
            <p className="footer-text">75000 Paris, France</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="footer-bottom"
        >
          <p>© 2025 Journée Culturelle Internationale. Tous droits réservés.</p>
        </motion.div>
      </footer>
    </div>
  );
}