/**
 * KisanRakshak - API Service Layer Stubs (SIH26131)
 *
 * This file outlines the contract for future backend / FastAPI / Flask integrations.
 * Currently, the application runs fully client-side using local mock datasets
 * and browser state.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const cropDiagnosisService = {
  /**
   * Post crop leaf/stem image to AI inference model
   * @param {FormData} formData - Contains image file, metadata (crop type, GPS coords)
   * @returns {Promise<Object>} Diagnostic result (issue, confidence, severity, symptoms, IPM)
   */
  async uploadAndDiagnose(formData) {
    // Future implementation:
    // const response = await fetch(`${API_BASE_URL}/crops/diagnose`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!response.ok) throw new Error('Diagnosis failed');
    // return await response.json();
    console.info('[API Stub] uploadAndDiagnose called with form data. Returning mock pipeline result.');
    return null;
  },

  /**
   * Fetch recent scan history for authenticated farmer
   */
  async getScanHistory(farmerId) {
    // return await fetch(`${API_BASE_URL}/farmers/${farmerId}/scans`).then(r => r.json());
    console.info('[API Stub] getScanHistory called for farmer:', farmerId);
    return null;
  }
};

export const regionalAlertsService = {
  /**
   * Query geo-fenced cluster alerts within radius (km) of farmer coordinates
   */
  async getClusterAlerts(latitude, longitude, radiusKm = 50) {
    // return await fetch(`${API_BASE_URL}/alerts/clusters?lat=${latitude}&lng=${longitude}&radius=${radiusKm}`).then(r => r.json());
    console.info('[API Stub] getClusterAlerts called with coordinates:', { latitude, longitude, radiusKm });
    return null;
  }
};

export const weatherService = {
  /**
   * Fetch localized micro-weather and humidity conditions for disease forecasting
   */
  async getFarmConditions(district, pinCode) {
    // return await fetch(`${API_BASE_URL}/weather/conditions?district=${district}&pin=${pinCode}`).then(r => r.json());
    console.info('[API Stub] getFarmConditions called for location:', { district, pinCode });
    return null;
  }
};
