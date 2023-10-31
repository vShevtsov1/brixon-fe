 const locations =[
        { "value": "", "label": "All" },
         { "value": "Abu Dhabi", "label": "Abu Dhabi" },
         { "value": "Al Barari", "label": "Al Barari" },
         { "value": "Al Barsha 1", "label": "Al Barsha 1" },
         { "value": "Al Barsha 2", "label": "Al Barsha 2" },
         { "value": "Al Barsha 3", "label": "Al Barsha 3" },
         { "value": "Al Furian", "label": "Al Furian" },
         { "value": "Al Habtoor City", "label": "Al Habtoor City" },
         { "value": "Al Jaddaf", "label": "Al Jaddaf" },
         { "value": "Al Khail Heights", "label": "Al Khail Heights" },
         { "value": "Al Reem Island, Abu Dhabi", "label": "Al Reem Island, Abu Dhabi" },
         { "value": "Al Sufouh 1", "label": "Al Sufouh 1" },
         { "value": "Al Sufouh 2", "label": "Al Sufouh 2" },
         { "value": "Al Wasl (City Walk)", "label": "Al Wasl (City Walk)" },
         { "value": "Arabian Ranches", "label": "Arabian Ranches" },
         { "value": "Arabian Ranches 2", "label": "Arabian Ranches 2" },
         { "value": "Arabian Ranches 3", "label": "Arabian Ranches 3" },
         { "value": "Arjan", "label": "Arjan" },
         { "value": "Barsha South", "label": "Barsha South" },
         { "value": "Bluewaters Island", "label": "Bluewaters Island" },
         { "value": "Business Bay", "label": "Business Bay" },
         { "value": "Cherrywoods", "label": "Cherrywoods" },
         { "value": "City of Arabia", "label": "City of Arabia" },
         { "value": "Complex (Dubailand)", "label": "Complex (Dubailand)" },
         { "value": "Creekside", "label": "Creekside" },
         { "value": "Culture Village", "label": "Culture Village" },
         { "value": "Damac Hills", "label": "Damac Hills" },
         { "value": "Damac Hills 2", "label": "Damac Hills 2" },
         { "value": "Damac Lagoons", "label": "Damac Lagoons" },
         { "value": "Discovery Gardens", "label": "Discovery Gardens" },
         { "value": "Downtown Dubai", "label": "Downtown Dubai" },
         { "value": "Dubai", "label": "Dubai" },
         { "value": "Dubai Creek Harbour", "label": "Dubai Creek Harbour" },
         { "value": "Dubai Design District", "label": "Dubai Design District" },
         { "value": "Dubai Festival City", "label": "Dubai Festival City" },
         { "value": "Dubai Golf City", "label": "Dubai Golf City" },
         { "value": "Dubai Harbour", "label": "Dubai Harbour" },
         { "value": "Dubai Healthcare City", "label": "Dubai Healthcare City" },
         { "value": "Dubai Hills", "label": "Dubai Hills" },
         { "value": "Dubai International", "label": "Dubai International" },
         { "value": "Dubai Investment Park", "label": "Dubai Investment Park" },
         { "value": "Dubai Islands", "label": "Dubai Islands" },
         { "value": "Dubai Marina", "label": "Dubai Marina" },
         { "value": "Dubai Maritime City", "label": "Dubai Maritime City" },
         { "value": "Dubai Production City", "label": "Dubai Production City" },
         { "value": "Dubai Science Park", "label": "Dubai Science Park" },
         { "value": "Dubai Silicon Oasis", "label": "Dubai Silicon Oasis" },
         { "value": "Dubai South", "label": "Dubai South" },
         { "value": "Dubai Sports City", "label": "Dubai Sports City" },
         { "value": "Dubai Studio City", "label": "Dubai Studio City" },
         { "value": "Dubai Water Canal", "label": "Dubai Water Canal" },
         { "value": "Dubai Waterfront", "label": "Dubai Waterfront" },
         { "value": "Emaar South", "label": "Emaar South" },
         { "value": "Emirates Hills", "label": "Emirates Hills" },
         { "value": "Expo City Dubai", "label": "Expo City Dubai" },
         { "value": "Financial Centre", "label": "Financial Centre" },
         { "value": "International City", "label": "International City" },
         { "value": "Jebel Ali", "label": "Jebel Ali" },
         { "value": "Jumeirah", "label": "Jumeirah" },
         { "value": "Jumeirah Beach Residence (JBR)", "label": "Jumeirah Beach Residence (JBR)" },
         { "value": "Jumeirah Golf Estates", "label": "Jumeirah Golf Estates" },
         { "value": "Jumeirah Heights", "label": "Jumeirah Heights" },
         { "value": "Jumeirah Islands", "label": "Jumeirah Islands" },
         { "value": "Jumeirah Lake Towers (JLT)", "label": "Jumeirah Lake Towers (JLT)" },
         { "value": "Jumeirah Park", "label": "Jumeirah Park" },
         { "value": "Jumeirah Village Circle (JVC)", "label": "Jumeirah Village Circle (JVC)" },
         { "value": "Jumeirah Village Triangle (JVT)", "label": "Jumeirah Village Triangle (JVT)" },
         { "value": "La Mer", "label": "La Mer" },
         { "value": "Liwan", "label": "Liwan" },
         { "value": "Madina Jumeirah Living", "label": "Madina Jumeirah Living" },
         { "value": "Mesk District", "label": "Mesk District" },
         { "value": "Mina Al Arab, Ras AI Khaimah", "label": "Mina Al Arab, Ras AI Khaimah" },
         { "value": "Mina Rashid", "label": "Mina Rashid" },
         { "value": "Mirdif Hills", "label": "Mirdif Hills" },
         { "value": "Mirdif Tulip", "label": "Mirdif Tulip" },
         { "value": "Mohammed Bin Rashid City (MBR)", "label": "Mohammed Bin Rashid City (MBR)" },
         { "value": "Motor City", "label": "Motor City" },
         { "value": "Mudon", "label": "Mudon" },
         { "value": "Nad Al Sheba", "label": "Nad Al Sheba" },
         { "value": "Nshama", "label": "Nshama" },
         { "value": "Old Town", "label": "Old Town" },
         { "value": "Oman", "label": "Oman" },
         { "value": "Park Gate Residences", "label": "Park Gate Residences" },
         { "value": "Palm Jumeirah", "label": "Palm Jumeirah" },
         { "value": "Ras Al Khor", "label": "Ras Al Khor" },
         { "value": "Remraam", "label": "Remraam" },
         { "value": "Sharjah", "label": "Sharjah" },
         { "value": "Sheikh Zayed Road", "label": "Sheikh Zayed Road" },
         { "value": "The Greens", "label": "The Greens" },
         { "value": "The Lakes", "label": "The Lakes" },
         { "value": "The Meadows", "label": "The Meadows" },
         { "value": "The Springs", "label": "The Springs" },
         { "value": "The Sustainable City", "label": "The Sustainable City" },
         { "value": "The Valley", "label": "The Valley" },
         { "value": "The Villa", "label": "The Villa" },
         { "value": "The World Islands", "label": "The World Islands" },
         { "value": "Tilal AI Ghaf", "label": "Tilal AI Ghaf" },
         { "value": "Town Square", "label": "Town Square" },
         { "value": "Villanova", "label": "Villanova" },
         { "value": "Wadi Al Safa 5", "label": "Wadi Al Safa 5" },
         { "value": "YAS Island", "label": "YAS Island" }
     ]
 ;
export default locations;