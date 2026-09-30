'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Truck,
  Zap,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Users,
  DoorClosed,
  Euro,
  UploadCloud,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Check,
  Building,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { TRANSLATIONS } from '@/data/translations';

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

interface VehicleFormData {
  // Step 1: Vehicle Details
  vehicleType: string;
  brand: string;
  customBrand: string;
  model: string;
  year: string;
  customYear: string;

  // Step 2: Specs & Photos
  transmission: string;
  customTransmission: string;
  fuelType: string;
  customFuelType: string;
  performance: string;
  mileage: string;
  seats: string;
  doors: string;
  images: UploadedPhoto[];

  // Step 3: Valuation & Owner Info (Strictly requested fields only)
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  priceMin: string;
  priceMax: string;
  ownerCity: string;
  ownerAddress: string;
  ownerPostalCode: string;
  notes: string;
}

const BRANDS = [
  'Toyota',
  'Porsche',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Tesla',
  'Lexus',
  'Land Rover',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Chevrolet',
  'Volkswagen',
  'Other',
];

const YEARS = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', 'Other'];
const TRANSMISSIONS = ['Automatic', 'Manual', 'Dual-Clutch / PDK', 'Other'];
const FUEL_TYPES = ['Petrol / Gasoline', 'Hybrid (HEV)', 'Plug-in Hybrid (PHEV)', '100% Electric (EV)', 'Diesel', 'Other'];
const RECOMMENDED_SEATS = ['2', '4', '5', '7', '8'];
const RECOMMENDED_DOORS = ['2', '3', '4', '5'];

const STEPS = [
  { id: 1, label: '01. Vehicle Details' },
  { id: 2, label: '02. Specs & Photos' },
  { id: 3, label: '03. Valuation & Owner' },
];

const getMobileStepLabel = (stepId: number, lang: string) => {
  if (lang === 'DE') {
    if (stepId === 1) return '1. Daten';
    if (stepId === 2) return '2. Fotos';
    return '3. Kontakt';
  }
  if (stepId === 1) return '1. Details';
  if (stepId === 2) return '2. Specs';
  return '3. Valuation';
};

export default function AcquisitionBar() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].acquisition;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Strictly NO prefilled / default values
  const [formData, setFormData] = useState<VehicleFormData>({
    vehicleType: 'Cars',
    brand: '',
    customBrand: '',
    model: '',
    year: '',
    customYear: '',

    transmission: '',
    customTransmission: '',
    fuelType: '',
    customFuelType: '',
    performance: '',
    mileage: '',
    seats: '',
    doors: '',
    images: [],

    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    priceMin: '',
    priceMax: '',
    ownerCity: '',
    ownerAddress: '',
    ownerPostalCode: '',
    notes: '',
  });

  const updateField = <K extends keyof VehicleFormData>(key: K, value: VehicleFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMessage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const uploaded = Array.from(files).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
  };

  const removePhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const validateCurrentStep = (): boolean => {
    // All fields are optional
    setErrorMessage(null);
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    const ref = `ACQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#002f61', '#ff8f00', '#10B981'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setErrorMessage(null);
    setFormData({
      vehicleType: 'Cars',
      brand: '',
      customBrand: '',
      model: '',
      year: '',
      customYear: '',

      transmission: '',
      customTransmission: '',
      fuelType: '',
      customFuelType: '',
      performance: '',
      mileage: '',
      seats: '',
      doors: '',
      images: [],

      ownerName: '',
      ownerPhone: '',
      ownerEmail: '',
      priceMin: '',
      priceMax: '',
      ownerCity: '',
      ownerAddress: '',
      ownerPostalCode: '',
      notes: '',
    });
  };

  const displayBrand = formData.brand === 'Other' ? formData.customBrand : formData.brand;
  const displayYear = formData.year === 'Other' ? formData.customYear : formData.year;

  return (
    <div
      id="acquisition"
      className="acquisition-root"
    >
      <div className="container-app">
        <div className="acquisition-inner-wrapper">
          {/* Main Floating Card */}
          <div className="card-container">
            {/* Top Fixed Header */}
            <div>
              <div className="top-bar-row">
                {/* Title */}
                <div>
                  <h2 className="card-heading">
                    {t.title}
                  </h2>
                  <p className="card-subheading">
                    {t.subtitle}
                  </p>
                </div>

                {/* Capsule Stepper (3 Steps) */}
                {!isSubmitted && (
                  <div className="capsule-stepper">
                    {t.steps.map((s) => {
                      const isActive = currentStep === s.id;
                      const isCompleted = currentStep > s.id;

                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            if (isCompleted || s.id < currentStep) {
                              setCurrentStep(s.id);
                              setErrorMessage(null);
                            }
                          }}
                          className={`capsule-step-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        >
                          {isCompleted && <Check size={12} color="#10B981" />}
                          <span className="step-label-desktop">{s.label}</span>
                          <span className="step-label-mobile">{getMobileStepLabel(s.id, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#DC2626',
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '10px',
                    padding: '9px 14px',
                    marginBottom: '16px',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* FORM STAGE CONTAINER */}
              <div className="form-stage-container">
                {isSubmitted ? (
                  /* Minimal Confirmation View */
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      textAlign: 'center',
                      padding: '16px 0',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#ECFDF5',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px auto',
                      }}
                    >
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      {t.confirmation.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '500px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
                      {t.confirmation.refPrefix} <strong style={{ color: '#002f61' }}>{submittedRef}</strong>. {t.confirmation.inspectorNotice}
                    </p>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '14px',
                        padding: '10px 18px',
                        fontSize: '13px',
                        color: '#334155',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}
                    >
                      <span>
                        <strong>{t.confirmation.vehicleLabel}</strong> {[displayYear, displayBrand, formData.model].filter(Boolean).join(' ') || (language === 'DE' ? 'Standardbewertung' : 'Standard Appraisal')}
                      </span>
                      {formData.priceMin || formData.priceMax ? (
                        <>
                          <span>•</span>
                          <span>
                            <strong>{t.confirmation.targetPriceLabel}</strong> {formData.priceMin ? `€${formData.priceMin}` : ''} {formData.priceMin && formData.priceMax ? '-' : ''} {formData.priceMax ? `€${formData.priceMax}` : ''}
                          </span>
                        </>
                      ) : null}
                      {formData.ownerCity ? (
                        <>
                          <span>•</span>
                          <span>
                            <strong>{t.confirmation.locationLabel}</strong> {formData.ownerCity}
                          </span>
                        </>
                      ) : null}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn-pill-blue confirmation-reset-btn"
                      >
                        {t.buttons.submitAnother}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()}>
                    <AnimatePresence mode="wait">
                      {/* STEP 1: VEHICLE DETAILS */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* Row 1: Vehicle Category Selection Grid (4 equal tabs) */}
                          <div style={{ marginBottom: '18px' }}>
                            <div className="field-label">
                              <Car size={13} color="#64748B" /> {t.categories.label}
                            </div>
                            <div className="category-tabs-grid">
                              {[
                                { id: 'Cars', label: t.categories.cars, icon: Car },
                                { id: 'SUVs', label: t.categories.vansSuvs, icon: Truck },
                                { id: 'Coupe', label: t.categories.coupeSports, icon: Gauge },
                                { id: 'Electric', label: t.categories.electric, icon: Zap },
                              ].map((type) => {
                                const Icon = type.icon;
                                const isActive = formData.vehicleType === type.id;
                                return (
                                  <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => updateField('vehicleType', type.id)}
                                    className={`category-tab-btn ${isActive ? 'active' : ''}`}
                                  >
                                    <Icon size={15} />
                                    <span>{type.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Row 2: Brand, Model, Year */}
                          <div className="step-grid-3">
                            {/* Brand / Make */}
                            <div>
                              <div className="field-label">{t.step1.brandLabel}</div>
                              <div className="constant-input-box">
                                <Car size={16} color="#6B7280" />
                                <select
                                  value={formData.brand}
                                  onChange={(e) => updateField('brand', e.target.value)}
                                  className="inner-field-element"
                                  style={{ color: formData.brand ? '#111827' : '#9CA3AF' }}
                                >
                                  <option value="" disabled>
                                    {t.step1.brandPlaceholder}
                                  </option>
                                  {BRANDS.map((b) => (
                                    <option key={b} value={b} style={{ color: '#111827' }}>
                                      {b === 'Other' ? (language === 'DE' ? 'Sonstige' : 'Other') : b}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formData.brand === 'Other' && (
                                <div className="constant-input-box" style={{ marginTop: '8px' }}>
                                  <input
                                    type="text"
                                    placeholder={t.step1.customBrandPlaceholder}
                                    value={formData.customBrand}
                                    onChange={(e) => updateField('customBrand', e.target.value)}
                                    className="inner-field-element"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Model */}
                            <div>
                              <div className="field-label">{t.step1.modelLabel}</div>
                              <div className="constant-input-box">
                                <input
                                  type="text"
                                  placeholder={t.step1.modelPlaceholder}
                                  value={formData.model}
                                  onChange={(e) => updateField('model', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>

                            {/* Year */}
                            <div>
                              <div className="field-label">{t.step1.yearLabel}</div>
                              <div className="constant-input-box">
                                <Calendar size={16} color="#6B7280" />
                                <select
                                  value={formData.year}
                                  onChange={(e) => updateField('year', e.target.value)}
                                  className="inner-field-element"
                                  style={{ color: formData.year ? '#111827' : '#9CA3AF' }}
                                >
                                  <option value="" disabled>
                                    {t.step1.yearPlaceholder}
                                  </option>
                                  {YEARS.map((y) => (
                                    <option key={y} value={y} style={{ color: '#111827' }}>
                                      {y === 'Other' ? (language === 'DE' ? 'Sonstige' : 'Other') : y}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formData.year === 'Other' && (
                                <div className="constant-input-box" style={{ marginTop: '8px' }}>
                                  <input
                                    type="text"
                                    placeholder={t.step1.customYearPlaceholder}
                                    value={formData.customYear}
                                    onChange={(e) => updateField('customYear', e.target.value)}
                                    className="inner-field-element"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: SPECS & PHOTOS */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* Row 1: Transmission, Fuel Type, Power */}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '16px',
                              marginBottom: '14px',
                            }}
                            className="step-grid-3"
                          >
                            {/* Transmission */}
                            <div>
                              <div className="field-label">{t.step2.transmissionLabel}</div>
                              <div className="constant-input-box">
                                <Cog size={16} color="#6B7280" />
                                <select
                                  value={formData.transmission}
                                  onChange={(e) => updateField('transmission', e.target.value)}
                                  className="inner-field-element"
                                  style={{ color: formData.transmission ? '#111827' : '#9CA3AF' }}
                                >
                                  <option value="" disabled>
                                    {t.step2.transmissionPlaceholder}
                                  </option>
                                  {t.transmissions.map((trans) => (
                                    <option key={trans} value={trans} style={{ color: '#111827' }}>
                                      {trans}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formData.transmission === 'Other' && (
                                <div className="constant-input-box" style={{ marginTop: '6px' }}>
                                  <input
                                    type="text"
                                    placeholder={t.step2.customTransmissionPlaceholder}
                                    value={formData.customTransmission}
                                    onChange={(e) => updateField('customTransmission', e.target.value)}
                                    className="inner-field-element"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Fuel Type */}
                            <div>
                              <div className="field-label">{t.step2.fuelLabel}</div>
                              <div className="constant-input-box">
                                <Fuel size={16} color="#6B7280" />
                                <select
                                  value={formData.fuelType}
                                  onChange={(e) => updateField('fuelType', e.target.value)}
                                  className="inner-field-element"
                                  style={{ color: formData.fuelType ? '#111827' : '#9CA3AF' }}
                                >
                                  <option value="" disabled>
                                    {t.step2.fuelPlaceholder}
                                  </option>
                                  {t.fuelTypes.map((f) => (
                                    <option key={f} value={f} style={{ color: '#111827' }}>
                                      {f}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {formData.fuelType === 'Other' && (
                                <div className="constant-input-box" style={{ marginTop: '6px' }}>
                                  <input
                                    type="text"
                                    placeholder={t.step2.customFuelPlaceholder}
                                    value={formData.customFuelType}
                                    onChange={(e) => updateField('customFuelType', e.target.value)}
                                    className="inner-field-element"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Power / Performance */}
                            <div>
                              <div className="field-label">{t.step2.performanceLabel}</div>
                              <div className="constant-input-box">
                                <input
                                  type="text"
                                  value={formData.performance}
                                  onChange={(e) => updateField('performance', e.target.value)}
                                  placeholder={t.step2.performancePlaceholder}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Mileage, Seats, Doors */}
                          <div className="specs-row-2">
                            {/* Mileage */}
                            <div className="specs-mileage-col">
                              <div className="field-label">{t.step2.mileageLabel}</div>
                              <div className="constant-input-box">
                                <Gauge size={16} color="#6B7280" />
                                <input
                                  type="text"
                                  placeholder={t.step2.mileagePlaceholder}
                                  value={formData.mileage}
                                  onChange={(e) => updateField('mileage', e.target.value)}
                                  className="inner-field-element"
                                />
                                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{t.step2.mileageUnit}</span>
                              </div>
                            </div>

                            {/* Seats */}
                            <div>
                              <div className="field-label">
                                <Users size={13} color="#6B7280" /> {t.step2.seatsLabel}
                              </div>
                              <div className="constant-input-box">
                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  placeholder={t.step2.seatsPlaceholder}
                                  value={formData.seats}
                                  onChange={(e) => updateField('seats', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                              <div className="rec-pills-row">
                                <span className="rec-label">{t.step2.seatsRec}</span>
                                {RECOMMENDED_SEATS.map((val) => (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => updateField('seats', val)}
                                    className={`rec-pill-btn ${formData.seats === val ? 'active' : ''}`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Doors */}
                            <div>
                              <div className="field-label">
                                <DoorClosed size={13} color="#6B7280" /> {t.step2.doorsLabel}
                              </div>
                              <div className="constant-input-box">
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  placeholder={t.step2.doorsPlaceholder}
                                  value={formData.doors}
                                  onChange={(e) => updateField('doors', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                              <div className="rec-pills-row">
                                <span className="rec-label">{t.step2.doorsRec}</span>
                                {RECOMMENDED_DOORS.map((val) => (
                                  <button
                                    key={val}
                                    type="button"
                                    onClick={() => updateField('doors', val)}
                                    className={`rec-pill-btn ${formData.doors === val ? 'active' : ''}`}
                                  >
                                    {val}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Row 3: Vehicle Photos Upload */}
                          <div>
                            <div className="field-label">{t.step2.photosLabel}</div>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              style={{ display: 'none' }}
                            />

                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="upload-dropzone"
                            >
                              <UploadCloud size={18} color="#002f61" style={{ flexShrink: 0 }} />
                              <span className="upload-text">
                                {t.step2.photosUploadText}
                              </span>
                            </div>

                            {formData.images.length > 0 && (
                              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                                {formData.images.map((img) => (
                                  <div
                                    key={img.id}
                                    style={{
                                      position: 'relative',
                                      width: '50px',
                                      height: '38px',
                                      borderRadius: '6px',
                                      overflow: 'hidden',
                                      flexShrink: 0,
                                      border: '1px solid #E2E8F0',
                                    }}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={img.url}
                                      alt={img.name}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removePhoto(img.id)}
                                      style={{
                                        position: 'absolute',
                                        inset: 0,
                                        backgroundColor: 'rgba(0,0,0,0.45)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.15s',
                                        cursor: 'pointer',
                                      }}
                                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: VALUATION & OWNER INFO */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {/* Row 1: Owner Identity & Phone Contact */}
                          <div className="step-grid-2">
                            <div>
                              <div className="field-label">{t.step3.nameLabel}</div>
                              <div className="constant-input-box">
                                <User size={15} color="#6B7280" />
                                <input
                                  type="text"
                                  placeholder={t.step3.namePlaceholder}
                                  value={formData.ownerName}
                                  onChange={(e) => updateField('ownerName', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="field-label">{t.step3.phoneLabel}</div>
                              <div className="constant-input-box">
                                <Phone size={15} color="#6B7280" />
                                <input
                                  type="tel"
                                  placeholder={t.step3.phonePlaceholder}
                                  value={formData.ownerPhone}
                                  onChange={(e) => updateField('ownerPhone', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Digital Contact & Expected Valuation */}
                          <div className="step-grid-2">
                            <div>
                              <div className="field-label">{t.step3.emailLabel}</div>
                              <div className="constant-input-box">
                                <Mail size={15} color="#6B7280" />
                                <input
                                  type="email"
                                  placeholder={t.step3.emailPlaceholder}
                                  value={formData.ownerEmail}
                                  onChange={(e) => updateField('ownerEmail', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="field-label">{t.step3.priceLabel}</div>
                              <div className="constant-input-box price-range-box">
                                <Euro size={15} color="#6B7280" style={{ flexShrink: 0 }} />
                                <input
                                  type="text"
                                  placeholder={t.step3.priceMinPlaceholder}
                                  value={formData.priceMin}
                                  onChange={(e) => updateField('priceMin', e.target.value)}
                                  className="inner-field-element price-input"
                                />
                                <span className="price-sep">—</span>
                                <span className="price-curr">€</span>
                                <input
                                  type="text"
                                  placeholder={t.step3.priceMaxPlaceholder}
                                  value={formData.priceMax}
                                  onChange={(e) => updateField('priceMax', e.target.value)}
                                  className="inner-field-element price-input"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Row 3: Location (City & Postal Code) */}
                          <div className="step-grid-2">
                            <div>
                              <div className="field-label">{t.step3.cityLabel}</div>
                              <div className="constant-input-box">
                                <Building size={15} color="#6B7280" />
                                <input
                                  type="text"
                                  placeholder={t.step3.cityPlaceholder}
                                  value={formData.ownerCity}
                                  onChange={(e) => updateField('ownerCity', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="field-label">{t.step3.postalCodeLabel}</div>
                              <div className="constant-input-box">
                                <MapPin size={15} color="#6B7280" />
                                <input
                                  type="text"
                                  placeholder={t.step3.postalCodePlaceholder}
                                  value={formData.ownerPostalCode}
                                  onChange={(e) => updateField('ownerPostalCode', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Row 4: Physical Inspection Address & Vehicle Notes */}
                          <div className="step-grid-2">
                            <div>
                              <div className="field-label">{t.step3.addressLabel}</div>
                              <div className="constant-input-box">
                                <MapPin size={15} color="#6B7280" />
                                <input
                                  type="text"
                                  placeholder={t.step3.addressPlaceholder}
                                  value={formData.ownerAddress}
                                  onChange={(e) => updateField('ownerAddress', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="field-label">{t.step3.notesLabel}</div>
                              <div className="constant-input-box">
                                <input
                                  type="text"
                                  placeholder={t.step3.notesPlaceholder}
                                  value={formData.notes}
                                  onChange={(e) => updateField('notes', e.target.value)}
                                  className="inner-field-element"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Fixed Navigation Bar */}
            {!isSubmitted && (
              <div className="form-footer-row">
                {/* Left: Reset / Back */}
                <div className="form-footer-left">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="form-back-btn"
                    >
                      <ArrowLeft size={15} /> {t.buttons.back}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="form-reset-btn"
                    >
                      <RotateCcw size={13} /> {t.buttons.reset}
                    </button>
                  )}
                </div>

                {/* Right: Step Action Buttons */}
                <div className="form-footer-right">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-pill-blue form-action-btn"
                    >
                      {t.buttons.next} <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn-pill-blue form-action-btn"
                    >
                      {t.buttons.submit}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .acquisition-root {
          position: relative;
          margin-top: -56px;
          z-index: 25;
          scroll-margin-top: 86px;
        }

        .acquisition-inner-wrapper {
          padding: 0 44px;
        }

        .card-container {
          background-color: #FFFFFF;
          border-radius: 24px;
          box-shadow: var(--shadow-float);
          border: 1px solid rgba(0, 0, 0, 0.07);
          padding: 28px 36px;
          min-height: 490px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .top-bar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
        }

        .card-heading {
          font-size: 22px;
          font-weight: 800;
          color: #0C0F17;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .card-subheading {
          font-size: 13px;
          color: #64748B;
          margin-top: 3px;
          margin-bottom: 0;
        }

        .capsule-stepper {
          background-color: #F1F5F9;
          border-radius: 9999px;
          padding: 4px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .capsule-step-btn {
          padding: 7px 16px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          background-color: transparent;
          color: #64748B;
          transition: all 0.2s ease;
          cursor: default;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border: none;
          white-space: nowrap;
        }

        .capsule-step-btn.completed {
          color: #1E293B;
          cursor: pointer;
        }

        .capsule-step-btn.active {
          background-color: #002f61;
          color: #FFFFFF;
          font-weight: 700;
        }

        .step-label-mobile {
          display: none;
        }

        .step-label-desktop {
          display: inline;
        }

        .form-stage-container {
          min-height: 305px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Strict Constant Input Box */
        .constant-input-box {
          height: 46px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border-radius: 12px;
          border: 1.5px solid #E2E8F0;
          background-color: #F8FAFC;
          transition: border-color 0.15s, background-color 0.15s;
          box-sizing: border-box;
        }

        .constant-input-box:focus-within {
          border-color: #002f61;
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(0, 47, 97, 0.08);
        }

        /* Inner form input & select */
        .inner-field-element {
          width: 100%;
          height: 100%;
          font-size: 13.5px;
          font-weight: 500;
          color: #111827;
          border: none;
          outline: none;
          background: transparent;
        }

        .inner-field-element::placeholder {
          color: #9CA3AF;
        }

        /* Unified field micro-labels */
        .field-label {
          font-size: 11px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .category-tabs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .category-tab-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 46px;
          padding: 0 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          background-color: #F8FAFC;
          color: #475569;
          border: 1.5px solid #E2E8F0;
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .category-tab-btn.active {
          background-color: #002f61;
          color: #FFFFFF;
          border-color: #002f61;
        }

        .step-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .specs-row-2 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 14px;
        }

        .rec-pills-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }

        .rec-label {
          font-size: 10px;
          color: #6B7280;
          font-weight: 500;
        }

        .rec-pill-btn {
          font-size: 10.5px;
          font-weight: 500;
          padding: 2px 7px;
          border-radius: 4px;
          background-color: #F1F5F9;
          color: #4B5565;
          border: 1px solid #E2E8F0;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .rec-pill-btn.active {
          font-weight: 700;
          background-color: #EEF2FF;
          color: #002f61;
          border-color: #93C5FD;
        }

        .upload-dropzone {
          border: 1.5px dashed #CBD5E1;
          border-radius: 12px;
          min-height: 46px;
          height: auto;
          padding: 8px 16px;
          text-align: center;
          background-color: #F8FAFC;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .upload-dropzone:hover {
          border-color: #002f61;
          background-color: #F0F6FF;
        }

        .upload-text {
          font-size: 13px;
          font-weight: 500;
          color: #4B5565;
        }

        .step-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 12px;
        }

        .price-range-box {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .price-input {
          flex: 1;
          min-width: 0;
        }

        .price-sep {
          color: #94A3B8;
          font-weight: 500;
          font-size: 14px;
          flex-shrink: 0;
        }

        .price-curr {
          font-size: 13px;
          color: #6B7280;
          font-weight: 600;
          flex-shrink: 0;
        }

        .form-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
          flex-wrap: wrap;
          gap: 12px;
        }

        .form-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #4B5565;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .form-back-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .form-reset-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          color: #9CA3AF;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 10px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .form-reset-btn:hover {
          background: #F1F5F9;
          color: #475569;
        }

        .form-footer-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .form-action-btn {
          padding: 0 28px;
          font-size: 14px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .confirmation-reset-btn {
          padding: 11px 26px;
          font-size: 13.5px;
        }

        @media (max-width: 1024px) {
          .acquisition-inner-wrapper {
            padding: 0 16px;
          }
          .card-container {
            padding: 22px 20px !important;
            min-height: auto !important;
          }
          .category-tabs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .step-grid-3 {
            grid-template-columns: 1fr 1fr !important;
            gap: 14px !important;
          }
          .specs-row-2 {
            grid-template-columns: 1fr 1fr !important;
            gap: 14px !important;
          }
          .specs-mileage-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .inner-field-element {
            font-size: 16px !important; /* Critical to prevent iOS Safari auto-zoom on mobile */
          }
          .step-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .specs-row-2 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .specs-mileage-col {
            grid-column: span 1;
          }
          .step-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 640px) {
          .acquisition-root {
            margin-top: -38px;
          }
          .acquisition-inner-wrapper {
            padding: 0;
          }
          .card-container {
            padding: 18px 14px 16px 14px !important;
            border-radius: 18px !important;
            min-height: auto !important;
          }
          .top-bar-row {
            flex-direction: column;
            align-items: stretch !important;
            gap: 14px !important;
            margin-bottom: 16px !important;
            padding-bottom: 14px !important;
          }
          .card-heading {
            font-size: 19px !important;
            line-height: 1.25 !important;
          }
          .card-subheading {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .capsule-stepper {
            width: 100% !important;
            display: flex !important;
            box-sizing: border-box !important;
            padding: 3px !important;
          }
          .capsule-step-btn {
            flex: 1 !important;
            min-width: 0 !important;
            justify-content: center !important;
            padding: 7px 4px !important;
            font-size: 11.5px !important;
          }
          .step-label-desktop {
            display: none !important;
          }
          .step-label-mobile {
            display: inline !important;
          }
          .category-tabs-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .category-tab-btn {
            height: auto !important;
            min-height: 44px !important;
            padding: 8px 8px !important;
            font-size: 12px !important;
            gap: 6px !important;
            text-align: center !important;
          }
          .form-stage-container {
            min-height: auto !important;
            justify-content: flex-start !important;
          }
          .upload-dropzone {
            padding: 10px 12px !important;
            min-height: 48px !important;
          }
          .upload-text {
            font-size: 12px !important;
            line-height: 1.35 !important;
          }
          .form-footer-row {
            margin-top: 14px !important;
            padding-top: 14px !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 10px !important;
          }
          .form-footer-left {
            flex-shrink: 0;
          }
          .form-back-btn {
            height: 44px !important;
            padding: 0 14px !important;
            background-color: #F1F5F9 !important;
            border-radius: 9999px !important;
            font-size: 13px !important;
          }
          .form-reset-btn {
            height: 44px !important;
            padding: 0 10px !important;
            font-size: 12px !important;
          }
          .form-footer-right {
            flex: 1 !important;
          }
          .form-action-btn {
            width: 100% !important;
            justify-content: center !important;
            height: 44px !important;
            padding: 0 16px !important;
            font-size: 13.5px !important;
          }
          .confirmation-reset-btn {
            width: 100% !important;
          }
        }

        @media (max-width: 400px) {
          .card-container {
            padding: 16px 12px 14px 12px !important;
            border-radius: 16px !important;
          }
          .card-heading {
            font-size: 17px !important;
          }
          .category-tab-btn {
            font-size: 11px !important;
            padding: 7px 4px !important;
          }
          .capsule-step-btn {
            font-size: 10.5px !important;
            padding: 6px 2px !important;
          }
        }
      `}</style>
    </div>
  );
}
