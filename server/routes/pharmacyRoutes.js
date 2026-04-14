const express = require('express');
const router = express.Router();

const mockPharmacies = [
    { id: 1, name: "City Care Pharmacy", distance: "1.2 km", address: "123 Main St", link: "https://maps.google.com/?q=123+Main+St", inventory: ["paracetamol", "amoxicillin", "cetirizine", "vitamin c", "ibuprofen"] },
    { id: 2, name: "HealthPlus Meds", distance: "2.5 km", address: "456 Oak Avenue", link: "https://maps.google.com/?q=456+Oak+Avenue", inventory: ["paracetamol", "pantoprazole", "metformin", "vitamin c"] },
    { id: 3, name: "LifeLine Dispensary", distance: "3.0 km", address: "789 Pine Road", link: "https://maps.google.com/?q=789+Pine+Road", inventory: ["ibuprofen", "amoxicillin", "azithromycin", "cetirizine"] },
    { id: 4, name: "QuickHeal Chemist", distance: "4.1 km", address: "101 Maple Drive", link: "https://maps.google.com/?q=101+Maple+Drive", inventory: ["paracetamol", "metformin", "atorvastatin", "pantoprazole"] }
];

router.get('/search', (req, res) => {
    try {
        const { medicine } = req.query;
        if (!medicine) {
            return res.status(400).json({ message: "Medicine name is required" });
        }
        
        const searchTerm = medicine.toLowerCase().trim();
        
        let results = mockPharmacies.filter(p => p.inventory.some(item => item.includes(searchTerm)));

        // If found, mark them available (real-world simulation)
        results = results.map(p => ({
            ...p,
            available: true
        }));

        res.status(200).json({ data: results });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
