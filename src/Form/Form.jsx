import React, { useEffect, useState } from 'react';
import './FormPage.css';
import fire from '../Firebase/FireBase';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * @component FormPage
 * @description A comprehensive initial treatment form (טופס טיפול ראשוני) component.
 * @returns {JSX.Element} The FormPage component.
 */
const FormPage = () => {
    const param = useParams();
    const nav = useNavigate();
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        formNumber: '',
        personalNumber: '',
        fullName: '',
        injuryDate: '',
        injuryTime: '',
        injuryMechanism: '',
        injuryDesc: '',
        consciousness: '',
        airwayInjury: '',
        airwayAction: '',
        airwayTime: '',
        airwayActionSuccess: '',
        breathingInjury: '',
        breathingAction: '',
        saturation: '',
        breathingTime: '',
        breathingActionSuccess: '',
        capillaryPulse: '',
        radialPulse: '',
        isPale: '',
        systolic: '',
        diastolic: '',
        circulationTime: '',
        circulationActionSuccess: '',
        neuroDeficits: [],
        gcsEyes: '',
        gcsVerbal: '',
        gcsMotor: '',
        exposure: [],
        treatments: [],
        otherTreatments: '',
        medicSelect: '',
        evacTime: '',
        evacuationType: '',
    });

    useEffect(() => {
        const fetchData = () => {
            fire.getData((newData) => {
                const fetchedData = newData[param.formDate];
                setData(fetchedData);
                setFormData({
                    formNumber: fetchedData.formNumber || '',
                    personalNumber: fetchedData.personalNumber || '',
                    fullName: fetchedData.fullName || '',
                    injuryDate: fetchedData.injuryDate || '',
                    injuryTime: fetchedData.injuryTime || '',
                    injuryMechanism: fetchedData.injuryMechanism || '',
                    injuryDesc: fetchedData.injuryDesc || '',
                    consciousness: fetchedData.consciousness || '',
                    airwayInjury: fetchedData.airwayInjury || '',
                    airwayAction: fetchedData.airwayAction || '',
                    airwayTime: fetchedData.airwayTime || '',
                    airwayActionSuccess: fetchedData.actionSuccess || '',
                    breathingInjury: fetchedData.breathingInjury || '',
                    breathingAction: fetchedData.breathingAction || '',
                    saturation: fetchedData.saturation || '',
                    breathingTime: fetchedData.breathingTime || '',
                    breathingActionSuccess: fetchedData.actionSuccess || '',
                    capillaryPulse: fetchedData.capillaryPulse || '',
                    radialPulse: fetchedData.radialPulse || '',
                    isPale: fetchedData.isPale || '',
                    systolic: fetchedData.systolic || '',
                    diastolic: fetchedData.diastolic || '',
                    circulationTime: fetchedData.circulationTime || '',
                    circulationActionSuccess: fetchedData.actionSuccess || '',
                    neuroDeficits: fetchedData.neuroDeficits ? fetchedData.neuroDeficits.split(',') : [],
                    gcsEyes: fetchedData.gcsEyes || '',
                    gcsVerbal: fetchedData.gcsVerbal || '',
                    gcsMotor: fetchedData.gcsMotor || '',
                    exposure: fetchedData.exposure ? fetchedData.exposure.split(',') : [],
                    treatments: fetchedData.treatments ? fetchedData.treatments.split(',') : [],
                    otherTreatments: fetchedData.otherTreatments || '',
                    medicSelect: fetchedData.medicSelect || '',
                    evacTime: fetchedData.evacTime || '',
                    evacuationType: fetchedData.evacuationType || '',
                });
                console.log("Fetched data:", fetchedData);
            }, param.formDate);
        };
        fetchData();
    }, [param.formDate]);


    const handleGoBack = (e) => {
        e.preventDefault();
        nav('/');

    }


    useEffect(() => {
        console.log("Current formData:", formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => {
                const newArray = prev[name] ? [...prev[name]] : [];
                if (checked) {
                    newArray.push(value);
                } else {
                    const index = newArray.indexOf(value);
                    if (index > -1) newArray.splice(index, 1);
                }
                return { ...prev, [name]: newArray };
            });
        } else if (type === 'radio') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for submission
        const submittedData = { ...formData };

        // Convert arrays to comma-separated strings if necessary
        submittedData.neuroDeficits = submittedData.neuroDeficits.join(',');
        submittedData.exposure = submittedData.exposure.join(',');
        submittedData.treatments = submittedData.treatments.join(',');

        try {
            console.log('Sending data:', submittedData);
            // Send data to Firebase
            await fire.sendData(submittedData);
            alert('הטופס נשלח בהצלחה!');
        } catch (error) {
            console.error('Error details:', error);
            alert(`שגיאה בשמירת הטופס: ${error.message}`);
        }
    };

    const handleReset = () => {
        if (window.confirm('האם אתה בטוח שברצונך לאפס את הטופס?')) {
            setFormData({
                formNumber: '',
                personalNumber: '',
                fullName: '',
                injuryDate: '',
                injuryTime: '',
                injuryMechanism: '',
                injuryDesc: '',
                consciousness: '',
                airwayInjury: '',
                airwayAction: '',
                airwayTime: '',
                airwayActionSuccess: '',
                breathingInjury: '',
                breathingAction: '',
                saturation: '',
                breathingTime: '',
                breathingActionSuccess: '',
                capillaryPulse: '',
                radialPulse: '',
                isPale: '',
                systolic: '',
                diastolic: '',
                circulationTime: '',
                circulationActionSuccess: '',
                neuroDeficits: [],
                gcsEyes: '',
                gcsVerbal: '',
                gcsMotor: '',
                exposure: [],
                treatments: [],
                otherTreatments: '',
                medicSelect: '',
                evacTime: '',
                evacuationType: '',
            });
        }
    };

    const handleUrgentEvac = () => {
        alert('פינוי דחוף נשלח!');
    };

    const handleReturnToAction = () => {
        alert('אושרה חזרה לפעילות');
    };

    const handleWait = () => {
        alert('סטטוס: ממתין');
    };

    return (
        <div className="form-page-container">
            <h1 className="form-title">טופס טיפול ראשוני</h1>
            <form className="form-wrapper" onSubmit={handleSubmit}>
            <button className="back-btn" onClick={handleGoBack}>חזור</button>
                {/* Personal Details Section */}
                <section className="form-section">
                    <h2 className="section-title">פרטים אישיים</h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="formNumber">מספר טופס</label>
                            <input
                                type="text"
                                id="formNumber"
                                name="formNumber"
                                placeholder="הכנס מספר טופס"
                                value={formData.formNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="personalNumber">מספר אישי/ת.ז</label>
                            <input
                                type="text"
                                id="personalNumber"
                                name="personalNumber"
                                placeholder="הכנס מספר אישי/ת.ז"
                                value={formData.personalNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fullName">שם מלא</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="הכנס שם מלא"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>שעת פציעה/תאריך פציעה</label>
                            <div className="form-subrow">
                                <input
                                    type="text"
                                    id="injuryDate"
                                    name="injuryDate"
                                    placeholder="20.12.2024"
                                    value={formData.injuryDate}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    id="injuryTime"
                                    name="injuryTime"
                                    placeholder="12:30"
                                    value={formData.injuryTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>מנגנון פציעה</label>
                        <div className="option-list">
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="אב״כ"
                                    checked={formData.injuryMechanism === 'אב״כ'}
                                    onChange={handleChange}
                                />
                                אב"כ
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="חבלה קהה"
                                    checked={formData.injuryMechanism === 'חבלה קהה'}
                                    onChange={handleChange}
                                />
                                חבלה קהה
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="נפילה"
                                    checked={formData.injuryMechanism === 'נפילה'}
                                    onChange={handleChange}
                                />
                                נפילה
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="פיצוץ"
                                    checked={formData.injuryMechanism === 'פיצוץ'}
                                    onChange={handleChange}
                                />
                                פיצוץ
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="שאיפת דרכים"
                                    checked={formData.injuryMechanism === 'שאיפת דרכים'}
                                    onChange={handleChange}
                                />
                                שאיפת דרכים
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="הדף מסלול"
                                    checked={formData.injuryMechanism === 'הדף מסלול'}
                                    onChange={handleChange}
                                />
                                הדף מסלול
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="injuryMechanism"
                                    value="רסיסים"
                                    checked={formData.injuryMechanism === 'רסיסים'}
                                    onChange={handleChange}
                                />
                                רסיסים
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="injuryDesc">תאר את נסיבות הפציעה</label>
                        <textarea
                            id="injuryDesc"
                            name="injuryDesc"
                            placeholder="תאר את נסיבות הפציעה"
                            value={formData.injuryDesc}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </section>

                {/* AVPU Section */}
                <section className="form-section">
                    <h2 className="section-title">מצב הכרה AVPU</h2>
                    <div className="form-group">
                        <label>מצב הכרה</label>
                        <div className="option-list">
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="consciousness"
                                    value="ערני"
                                    checked={formData.consciousness === 'ערני'}
                                    onChange={handleChange}
                                />
                                ערני
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="consciousness"
                                    value="מגיב לקול"
                                    checked={formData.consciousness === 'מגיב לקול'}
                                    onChange={handleChange}
                                />
                                מגיב לקול
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="consciousness"
                                    value="מגיב לכאב"
                                    checked={formData.consciousness === 'מגיב לכאב'}
                                    onChange={handleChange}
                                />
                                מגיב לכאב
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="consciousness"
                                    value="לא מגיב"
                                    checked={formData.consciousness === 'לא מגיב'}
                                    onChange={handleChange}
                                />
                                לא מגיב
                            </label>
                        </div>
                    </div>
                </section>

                {/* ABCDE Section */}
                <section className="form-section">
                    <h2 className="section-title">סכמת ABCDE</h2>

                    {/* A - Airway */}
                    <fieldset className="form-subsection">
                        <legend>A: נתיב אוויר</legend>
                        <div className="form-group">
                            <label>פגיעה בנתיב אוויר?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="airwayInjury"
                                        value="כן"
                                        checked={formData.airwayInjury === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="airwayInjury"
                                        value="לא"
                                        checked={formData.airwayInjury === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="airwayAction">הכנס את הפעולה שבוצעה</label>
                            <input
                                type="text"
                                id="airwayAction"
                                name="airwayAction"
                                placeholder="הכנס פעולה שבוצעה"
                                value={formData.airwayAction}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="airwayTime">שעת פעולה</label>
                            <input
                                type="text"
                                id="airwayTime"
                                name="airwayTime"
                                placeholder="12:30"
                                value={formData.airwayTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>האם הפעולה הצליחה?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="airwayActionSuccess"
                                        value="כן"
                                        checked={formData.airwayActionSuccess === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="airwayActionSuccess"
                                        value="לא"
                                        checked={formData.airwayActionSuccess === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    {/* B - Breathing */}
                    <fieldset className="form-subsection">
                        <legend>B: נשימה</legend>
                        <div className="form-group">
                            <label>פגיעה בנשימה?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="breathingInjury"
                                        value="כן"
                                        checked={formData.breathingInjury === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="breathingInjury"
                                        value="לא"
                                        checked={formData.breathingInjury === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="breathingAction">הכנס את הפעולה שבוצעה</label>
                            <input
                                type="text"
                                id="breathingAction"
                                name="breathingAction"
                                placeholder="הכנס פעולה שבוצעה"
                                value={formData.breathingAction}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group saturation-group">
                            <label htmlFor="saturation">סטורציה</label>
                            <div className="saturation-input">
                                <input
                                    type="text"
                                    id="saturation"
                                    name="saturation"
                                    placeholder="אחוז סטורציה"
                                    value={formData.saturation}
                                    onChange={handleChange}
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="breathingTime">שעת פעולה</label>
                            <input
                                type="text"
                                id="breathingTime"
                                name="breathingTime"
                                placeholder="12:30"
                                value={formData.breathingTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>האם הפעולה הצליחה?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="breathingActionSuccess"
                                        value="כן"
                                        checked={formData.breathingActionSuccess === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="breathingActionSuccess"
                                        value="לא"
                                        checked={formData.breathingActionSuccess === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    {/* C - Circulation */}
                    <fieldset className="form-subsection">
                        <legend>C: מחזור דם</legend>
                        <div className="form-group">
                            <label htmlFor="capillaryPulse">דופק קפילרי</label>
                            <input
                                type="text"
                                id="capillaryPulse"
                                name="capillaryPulse"
                                placeholder="הכנס ערך"
                                value={formData.capillaryPulse}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="radialPulse">דופק רדיאלי</label>
                            <input
                                type="text"
                                id="radialPulse"
                                name="radialPulse"
                                placeholder="הכנס ערך"
                                value={formData.radialPulse}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>חיוור?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="isPale"
                                        value="כן"
                                        checked={formData.isPale === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="isPale"
                                        value="לא"
                                        checked={formData.isPale === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="systolic">לחץ דם סיסטולי</label>
                                <input
                                    type="text"
                                    id="systolic"
                                    name="systolic"
                                    placeholder="הכנס לחץ דם סיסטולי"
                                    value={formData.systolic}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="diastolic">לחץ דם דיאסטולי</label>
                                <input
                                    type="text"
                                    id="diastolic"
                                    name="diastolic"
                                    placeholder="הכנס לחץ דם דיאסטולי"
                                    value={formData.diastolic}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="circulationTime">שעת פעולה</label>
                            <input
                                type="text"
                                id="circulationTime"
                                name="circulationTime"
                                placeholder="12:30"
                                value={formData.circulationTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>האם הפעולה הצליחה?</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="circulationActionSuccess"
                                        value="כן"
                                        checked={formData.circulationActionSuccess === 'כן'}
                                        onChange={handleChange}
                                    />
                                    כן
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="radio"
                                        name="circulationActionSuccess"
                                        value="לא"
                                        checked={formData.circulationActionSuccess === 'לא'}
                                        onChange={handleChange}
                                    />
                                    לא
                                </label>
                            </div>
                        </div>
                    </fieldset>

                    {/* D - Disability (Neurological) */}
                    <fieldset className="form-subsection">
                        <legend>D: הערכה נוירולוגית</legend>
                        <p className="instructions">
                            הנחיות: בשלב זה יש לבדוק תפקוד נוירולוגי כולל מוטורי, סנסורי והתרחבות האישונים.
                            סמן את החסרים הנוירולוגיים הרלוונטיים והמשך לסולם גלזגו.
                        </p>
                        <div className="form-group">
                            <label>חסרים נוירולוגיים</label>
                            <div className="option-list">
                                <label className="option-pill">
                                    <input
                                        type="checkbox"
                                        name="neuroDeficits"
                                        value="אישונים לא סימטריים"
                                        checked={formData.neuroDeficits.includes('אישונים לא סימטריים')}
                                        onChange={handleChange}
                                    />
                                    אישונים לא סימטריים
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="checkbox"
                                        name="neuroDeficits"
                                        value="חוסר מוטורי"
                                        checked={formData.neuroDeficits.includes('חוסר מוטורי')}
                                        onChange={handleChange}
                                    />
                                    חוסר מוטורי
                                </label>
                                <label className="option-pill">
                                    <input
                                        type="checkbox"
                                        name="neuroDeficits"
                                        value="חוסר סנסורי"
                                        checked={formData.neuroDeficits.includes('חוסר סנסורי')}
                                        onChange={handleChange}
                                    />
                                    חוסר סנסורי
                                </label>
                            </div>
                        </div>

                        <h4 className="sub-title">סולם גלזגו (GCS)</h4>
                        <div className="form-group">
                            <label>עיניים</label>
                            <select
                                name="gcsEyes"
                                value={formData.gcsEyes}
                                onChange={handleChange}
                            >
                                <option value="">בחר ערך</option>
                                <option value="1">אין</option>
                                <option value="2">לכאב</option>
                                <option value="3">לקול</option>
                                <option value="4">ספונטני</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>תגובה מילולית</label>
                            <select
                                name="gcsVerbal"
                                value={formData.gcsVerbal}
                                onChange={handleChange}
                            >
                                <option value="">בחר ערך</option>
                                <option value="1">לא תגובה - 1</option>
                                <option value="2">קולות - 2</option>
                                <option value="3">מילים לא מובנות - 3</option>
                                <option value="4">מילים משמעותיות - 4</option>
                                <option value="5">מתמצא - 5</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>תגובה מוטורית</label>
                            <select
                                name="gcsMotor"
                                value={formData.gcsMotor}
                                onChange={handleChange}
                            >
                                <option value="">בחר ערך</option>
                                <option value="1">לא תגובה - 1</option>
                                <option value="2">אקסטנציה - 2</option>
                                <option value="3">פלקסיה - 3</option>
                                <option value="4">נסיגה לכאב - 4</option>
                                <option value="5">מ Lokal - 5</option>
                                <option value="6">מציית - 6</option>
                            </select>
                        </div>

                        <p>כולל: GCS 0/15 ציון</p>
                    </fieldset>

                    {/* E - Exposure */}
                    <fieldset className="form-subsection">
                        <legend>E: חשיפה</legend>
                        <div className="option-list">
                            <label className="option-pill">
                                <input
                                    type="checkbox"
                                    name="exposure"
                                    value="קיבוע עמ״ש"
                                    checked={formData.exposure.includes('קיבוע עמ״ש')}
                                    onChange={handleChange}
                                />
                                קיבוע עמ"ש
                            </label>
                            <label className="option-pill">
                                <input
                                    type="checkbox"
                                    name="exposure"
                                    value="חימום אקטיבי"
                                    checked={formData.exposure.includes('חימום אקטיבי')}
                                    onChange={handleChange}
                                />
                                חימום אקטיבי
                            </label>
                            <label className="option-pill">
                                <input
                                    type="checkbox"
                                    name="exposure"
                                    value="הפשטה וכיסוי"
                                    checked={formData.exposure.includes('הפשטה וכיסוי')}
                                    onChange={handleChange}
                                />
                                הפשטה וכיסוי
                            </label>
                        </div>
                    </fieldset>
                </section>

                {/* Fluids and Medications */}
                <section className="form-section">
                    <h2 className="section-title">נוזלים ותרופות</h2>
                    <div className="option-list">
                        <label className="option-pill">
                            <input
                                type="checkbox"
                                name="treatments"
                                value="נוזלים"
                                checked={formData.treatments.includes('נוזלים')}
                                onChange={handleChange}
                            />
                            נוזלים
                        </label>
                        <label className="option-pill">
                            <input
                                type="checkbox"
                                name="treatments"
                                value="אנטיביוטיקה"
                                checked={formData.treatments.includes('אנטיביוטיקה')}
                                onChange={handleChange}
                            />
                            אנטיביוטיקה
                        </label>
                        <label className="option-pill">
                            <input
                                type="checkbox"
                                name="treatments"
                                value="הדרמה וכאב"
                                checked={formData.treatments.includes('הדרמה וכאב')}
                                onChange={handleChange}
                            />
                            הדרמה וכאב
                        </label>
                        <label className="option-pill">
                            <input
                                type="checkbox"
                                name="treatments"
                                value="אחר"
                                checked={formData.treatments.includes('אחר')}
                                onChange={handleChange}
                            />
                            אחר
                        </label>
                    </div>
                    <input
                        type="text"
                        name="otherTreatments"
                        placeholder="פרט טיפולים נוספים"
                        value={formData.otherTreatments}
                        onChange={handleChange}
                    />
                </section>

                {/* Caregiver and Evacuation Details */}
                <section className="form-section">
                    <h2 className="section-title">פרטי מטפל ופינוי</h2>
                    <div className="form-group">
                        <label htmlFor="medicSelect">בחר מטפל/ת</label>
                        <select
                            id="medicSelect"
                            name="medicSelect"
                            value={formData.medicSelect}
                            onChange={handleChange}
                        >
                            <option value="">בחר מטפל/ת</option>
                            {/* Add more options if needed */}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="evacTime">זמן פינוי</label>
                        <input
                            type="text"
                            id="evacTime"
                            name="evacTime"
                            placeholder="12:30"
                            value={formData.evacTime}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>סוג פינוי</label>
                        <div className="option-list">
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="evacuationType"
                                    value="רכב"
                                    checked={formData.evacuationType === 'רכב'}
                                    onChange={handleChange}
                                />
                                רכב
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="evacuationType"
                                    value="מסוק"
                                    checked={formData.evacuationType === 'מסוק'}
                                    onChange={handleChange}
                                />
                                מסוק
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="evacuationType"
                                    value="ימי"
                                    checked={formData.evacuationType === 'ימי'}
                                    onChange={handleChange}
                                />
                                ימי
                            </label>
                            <label className="option-pill">
                                <input
                                    type="radio"
                                    name="evacuationType"
                                    value="יבשתי"
                                    checked={formData.evacuationType === 'יבשתי'}
                                    onChange={handleChange}
                                />
                                יבשתי
                            </label>
                        </div>
                    </div>

                    <div className="form-row evac-buttons">
                        <button type="button" className="evac-button danger" onClick={handleUrgentEvac}>
                            פינוי דחוף
                        </button>
                        <button type="button" className="evac-button danger" onClick={handleReturnToAction}>
                            חזרה לפעילות
                        </button>
                        <button type="button" className="evac-button danger" onClick={handleWait}>
                            המתנה
                        </button>
                    </div>
                </section>

                {/* <div className="form-actions">
                    <button type="submit" className="submit-button">שמור</button>
                    <button type="button" className="reset-button" onClick={handleReset}>אפס</button>
                </div> */}
            </form>
        </div>
    );
};

export default FormPage;
