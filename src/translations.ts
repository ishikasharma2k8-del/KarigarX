import { LanguageOption, SupportedLanguage } from './types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export interface UITranslation {
  appTitle: string;
  appSubtitle: string;
  badgeSih: string;
  navHome: string;
  navScan: string;
  navCatalog: string;
  navProfile: string;
  homeHeadline: string;
  homeSubtitle: string;
  scanYourProduct: string;
  uploadFromGallery: string;
  recentItems: string;
  noRecentItems: string;
  noRecentItemsDesc: string;
  viewAllCatalog: string;
  scanProduct: string;
  openCamera: string;
  uploadPhoto: string;
  trySamplePhoto: string;
  sampleItems: string;
  analyzingTitle: string;
  analyzingStep1: string;
  analyzingStep2: string;
  analyzingStep3: string;
  analyzingStep4: string;
  timeRemainingEstimate: string;
  productCardTitle: string;
  category: string;
  craftStyle: string;
  materials: string;
  colors: string;
  description: string;
  keySellingPoints: string;
  targetAudience: string;
  suitableMarket: string;
  suggestedPrice: string;
  priceRange: string;
  tagsKeywords: string;
  artisanTip: string;
  editDetails: string;
  saveToCatalog: string;
  savedToCatalog: string;
  scanAnother: string;
  shareCard: string;
  viewCatalog: string;
  myCatalog: string;
  emptyCatalogTitle: string;
  emptyCatalogDesc: string;
  startScanning: string;
  speakDetails: string;
  stopSpeaking: string;
  close: string;
  saveChanges: string;
  cancel: string;
  cameraPermissionError: string;
  switchCamera: string;
  capturePhoto: string;
  retakePhoto: string;
  marketLocal: string;
  marketRetail: string;
  marketWholesale: string;
  marketExport: string;
  whatsappShareText: string;
  copiedToClipboard: string;
  deleteItem: string;
  profileTitle: string;
  artisanName: string;
  artisanBadge: string;
  selectLanguage: string;
  marketAccessTips: string;
  speakToCreateListing: string;
  useVoiceInstead: string;
  usePhotoInstead: string;
  voiceRecordingTitle: string;
  voiceRecordingSubtitle: string;
  listeningStatus: string;
  stopRecording: string;
  startRecording: string;
  reviewSpokenText: string;
  editSpokenTextPlaceholder: string;
  generateFromVoice: string;
  reRecord: string;
  voiceHelpTips: string;
  voiceTip1: string;
  voiceTip2: string;
  voiceTip3: string;
  voiceTip4: string;
  voiceSamplesTitle: string;
  publishListing: string;
  publishingListing: string;
  publishingSuccess: string;
  publishedBadge: string;
  myListings: string;
  viewProduct: string;
  viewInMarketplace: string;
  editListing: string;
  deleteListing: string;
  artisanNameLabel: string;
  artisanLocationLabel: string;
  buyerEnquiry: string;
  verifiedArtisanBadge: string;
  fairPriceBreakdown: string;
  directFromArtisan: string;
  actionCamera: string;
  actionCameraDesc: string;
  actionSpeak: string;
  actionSpeakDesc: string;
  actionProducts: string;
  actionProductsDesc: string;
  actionOrders: string;
  actionOrdersDesc: string;
  actionEarnings: string;
  actionEarningsDesc: string;
  actionHelp: string;
  actionHelpDesc: string;
  flowShowUs: string;
  flowTellUs: string;
  flowWeCreate: string;
  flowYouSell: string;
  flowYouEarn: string;
  photoGuideTitle: string;
  photoDark: string;
  photoBlurry: string;
  photoClear: string;
  adjustPriceVisual: string;
  orderStepReceived: string;
  orderStepShipped: string;
  orderStepDelivered: string;
  listenAudioHelp: string;
}

export const UI_STRINGS: Record<SupportedLanguage, UITranslation> = {
  en: {
    appTitle: 'KarigarX',
    appSubtitle: 'AI-powered cataloging & market access for artisans',
    badgeSih: 'KarigarX AI',
    navHome: 'Home',
    navScan: 'Create Listing',
    navCatalog: 'My Catalog',
    navProfile: 'Profile',
    homeHeadline: 'Turn your craft into a market-ready product',
    homeSubtitle: 'AI-powered cataloging and market access for artisans.',
    scanYourProduct: 'Scan Your Product',
    uploadFromGallery: 'Upload from Gallery',
    recentItems: 'Recently Created Products',
    noRecentItems: 'No catalog items yet',
    noRecentItemsDesc: 'Scan your handmade craft or speak to generate instant fair pricing & professional listings.',
    viewAllCatalog: 'View All in Catalog',
    scanProduct: 'Create Product Listing',
    openCamera: 'Take Photo with Camera',
    uploadPhoto: 'Upload from Gallery',
    trySamplePhoto: 'Or try with a sample artisan craft:',
    sampleItems: 'Sample Crafts',
    analyzingTitle: 'KarigarX AI is analyzing your product...',
    analyzingStep1: 'Recognizing traditional craft style & heritage...',
    analyzingStep2: 'Identifying natural raw materials & colors...',
    analyzingStep3: 'Computing fair Indian market price in ₹...',
    analyzingStep4: 'Formulating top selling points & tags...',
    timeRemainingEstimate: 'Generating full catalog details in ~15-20s',
    productCardTitle: 'KarigarX AI Generated Listing',
    category: 'Category',
    craftStyle: 'Craft Style / Tradition',
    materials: 'Materials Used',
    colors: 'Main Colors',
    description: 'Product Story & Description',
    keySellingPoints: '3 Key Selling Points',
    targetAudience: 'Target Customers',
    suitableMarket: 'Suitable Market Fit',
    suggestedPrice: 'Suggested Selling Price',
    priceRange: 'Fair Price Range',
    tagsKeywords: 'E-commerce & Search Tags',
    artisanTip: 'Artisan Business Tip',
    editDetails: 'Edit Listing',
    saveToCatalog: 'Save to Catalog',
    savedToCatalog: 'Saved to Catalog ✓',
    scanAnother: 'Create Another Product',
    shareCard: 'Share / WhatsApp',
    viewCatalog: 'View My Catalog',
    myCatalog: 'My Artisan Catalog',
    emptyCatalogTitle: 'No saved products yet',
    emptyCatalogDesc: 'Scan handmade products or speak to build your digital seller catalog.',
    startScanning: 'Create First Product',
    speakDetails: 'Listen to Details',
    stopSpeaking: 'Stop Audio',
    close: 'Close',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    cameraPermissionError: 'Please grant camera access or choose an image from gallery.',
    switchCamera: 'Switch Camera',
    capturePhoto: 'Snap Photo',
    retakePhoto: 'Retake Photo',
    marketLocal: 'Local Bazaars / Haats',
    marketRetail: 'Retail & Boutiques',
    marketWholesale: 'Wholesale & Corporate Gifting',
    marketExport: 'Global / Export Markets',
    whatsappShareText: 'Check out this handmade artisan product on KarigarX!',
    copiedToClipboard: 'Product details copied to clipboard!',
    deleteItem: 'Delete Item',
    profileTitle: 'Artisan Profile & Settings',
    artisanName: 'Master Artisan (Karigar)',
    artisanBadge: 'Verified Indian Craftsperson',
    selectLanguage: 'App & Voice Language',
    marketAccessTips: 'Market Access & Artisan Schemes',
    speakToCreateListing: 'Speak to Create Listing',
    useVoiceInstead: 'Use Voice Instead (Hindi / Telugu / English)',
    usePhotoInstead: 'Use Camera / Gallery Photo Instead',
    voiceRecordingTitle: 'Speak to Create Product Listing',
    voiceRecordingSubtitle: 'Speak naturally about your craft in your native language. AI will generate the entire catalog listing.',
    listeningStatus: 'Listening... (Speak now)',
    stopRecording: 'Done Speaking (Stop)',
    startRecording: 'Tap Microphone to Speak',
    reviewSpokenText: 'Review Your Spoken Craft Details',
    editSpokenTextPlaceholder: 'Your spoken words will appear here. You can also edit or type additional craft details...',
    generateFromVoice: 'Generate Listing with AI',
    reRecord: 'Record Voice Again',
    voiceHelpTips: 'Helpful points to mention while speaking:',
    voiceTip1: 'What is your craft item (e.g. terracotta vase, handloom saree, brass diya)?',
    voiceTip2: 'What materials, colors, and natural dyes were used?',
    voiceTip3: 'How much time or effort went into handcrafting it?',
    voiceTip4: 'What is your expected fair price or target buyer?',
    voiceSamplesTitle: 'Or tap a sample craft spoken prompt to try:',
    publishListing: 'Publish Listing',
    publishingListing: 'Publishing to Marketplace...',
    publishingSuccess: '🎉 Your product is now live on KarigarX Marketplace!',
    publishedBadge: 'LIVE',
    myListings: 'My Listings',
    viewProduct: 'View Product',
    viewInMarketplace: 'View in Marketplace',
    editListing: 'Edit Listing',
    deleteListing: 'Remove Listing',
    artisanNameLabel: 'Artisan Name',
    artisanLocationLabel: 'Craft Location',
    buyerEnquiry: 'Contact Artisan on WhatsApp',
    verifiedArtisanBadge: 'Verified Artisan',
    fairPriceBreakdown: 'Fair Pricing & Artisan Guarantee',
    directFromArtisan: '100% Direct from Artisan • 0% Platform Commission',
    actionCamera: 'Camera',
    actionCameraDesc: 'Take Product Photo',
    actionSpeak: 'Speak',
    actionSpeakDesc: 'Voice Product Creator',
    actionProducts: 'My Products',
    actionProductsDesc: 'Catalog & Store',
    actionOrders: 'Orders',
    actionOrdersDesc: 'Track Buyer Orders',
    actionEarnings: 'Earnings',
    actionEarningsDesc: 'Sales & Money Earned',
    actionHelp: 'Help',
    actionHelpDesc: 'Visual & Audio Guide',
    flowShowUs: 'Show Us',
    flowTellUs: 'Tell Us',
    flowWeCreate: 'AI Creates',
    flowYouSell: 'You Sell',
    flowYouEarn: 'You Earn',
    photoGuideTitle: 'Photo Guide for Artisans',
    photoDark: 'Too Dark',
    photoBlurry: 'Blurry / Shaky',
    photoClear: 'Bright & Clear',
    adjustPriceVisual: 'Tap + or - to easily change price',
    orderStepReceived: 'Order Received',
    orderStepShipped: 'Shipped',
    orderStepDelivered: 'Delivered',
    listenAudioHelp: 'Listen in Audio',
  },
  hi: {
    appTitle: 'KarigarX',
    appSubtitle: 'शिल्पकारों और बुनकरों के लिए AI कैटलॉग और बाज़ार साधन',
    badgeSih: 'KarigarX AI',
    navHome: 'होम',
    navScan: 'उत्पाद बनाएं',
    navCatalog: 'मेरा कैटलॉग',
    navProfile: 'प्रोफ़ाइल',
    homeHeadline: 'अपने हस्तशिल्प को बनाएं बाज़ार के लिए तैयार उत्पाद',
    homeSubtitle: 'कारीगरों के लिए AI-संचालित कैटलॉगिंग और उचित मूल्य साधन।',
    scanYourProduct: 'उत्पाद स्कैन करें',
    uploadFromGallery: 'गैलरी से अपलोड करें',
    recentItems: 'हाल ही में बनाए गए उत्पाद',
    noRecentItems: 'अभी कोई उत्पाद नहीं है',
    noRecentItemsDesc: 'अपने हस्तशिल्प की फोटो लें या बोलकर उचित मूल्य एवं विवरण तुरंत पाएं।',
    viewAllCatalog: 'पूरा कैटलॉग देखें',
    scanProduct: 'उत्पाद लिस्टिंग बनाएं',
    openCamera: 'कैमरे से फोटो लें',
    uploadPhoto: 'गैलरी से फोटो अपलोड करें',
    trySamplePhoto: 'या नमूना हस्तशिल्प से आज़माएं:',
    sampleItems: 'नमूना शिल्प',
    analyzingTitle: 'KarigarX AI आपके हस्तशिल्प का विश्लेषण कर रहा है...',
    analyzingStep1: 'पारंपरिक शिल्प शैली और धरोहर की पहचान...',
    analyzingStep2: 'प्राकृतिक सामग्री और रंगों का पता लगाया जा रहा है...',
    analyzingStep3: 'उचित भारतीय बाज़ार मूल्य (₹) की गणना...',
    analyzingStep4: 'प्रमुख बिक्री बिंदु और टैग तैयार किए जा रहे हैं...',
    timeRemainingEstimate: 'लगभग 15-20 सेकंड में पूर्ण विवरण तैयार हो रहा है',
    productCardTitle: 'KarigarX AI द्वारा तैयार उत्पाद विवरण',
    category: 'श्रेणी (Category)',
    craftStyle: 'शिल्प शैली / परंपरा',
    materials: 'उपयोग की गई सामग्री',
    colors: 'मुख्य रंग',
    description: 'उत्पाद की कहानी और विवरण',
    keySellingPoints: '3 मुख्य बिक्री बिंदु (Key Points)',
    targetAudience: 'लक्षित ग्राहक (Target Customers)',
    suitableMarket: 'उपयुक्त बाज़ार',
    suggestedPrice: 'सुझाया गया विक्रय मूल्य',
    priceRange: 'उचित मूल्य सीमा',
    tagsKeywords: 'ऑनलाइन खोज टैग (Keywords)',
    artisanTip: 'कारीगर के लिए व्यापार सलाह',
    editDetails: 'लिस्टिंग बदलें (Edit)',
    saveToCatalog: 'कैटलॉग में सहेजें',
    savedToCatalog: 'कैटलॉग में सहेजा गया ✓',
    scanAnother: 'दूसरा उत्पाद बनाएं',
    shareCard: 'व्हाट्सएप / साझा करें',
    viewCatalog: 'मेरा कैटलॉग देखें',
    myCatalog: 'मेरा कारीगर कैटलॉग',
    emptyCatalogTitle: 'अभी तक कोई उत्पाद सहेजा नहीं गया',
    emptyCatalogDesc: 'अपने हस्तनिर्मित उत्पादों को स्कैन करें या बोलकर डिजिटल कैटलॉग बनाएं।',
    startScanning: 'पहला उत्पाद बनाएं',
    speakDetails: 'विवरण सुनें (Audio)',
    stopSpeaking: 'ऑडियो रोकें',
    close: 'बंद करें',
    saveChanges: 'बदलाव सहेजें',
    cancel: 'रद्द करें',
    cameraPermissionError: 'कृपया कैमरा अनुमति दें या गैलरी से फोटो चुनें।',
    switchCamera: 'कैमरा बदलें',
    capturePhoto: 'फोटो खींचे',
    retakePhoto: 'दोबारा फोटो लें',
    marketLocal: 'स्थानीय बाज़ार / हाट',
    marketRetail: 'खुदरा दुकानें व बुटीक',
    marketWholesale: 'थोक व कॉर्पोरेट उपहार',
    marketExport: 'वैश्विक / निर्यात बाज़ार',
    whatsappShareText: 'यह हस्तनिर्मित कारीगरी उत्पाद देखें (KarigarX)!',
    copiedToClipboard: 'उत्पाद विवरण कॉपी कर लिया गया!',
    deleteItem: 'हटाएं',
    profileTitle: 'कारीगर प्रोफ़ाइल व सेटिंग्स',
    artisanName: 'मास्टर कारीगर / शिल्पकार',
    artisanBadge: 'प्रमाणित भारतीय हस्तशिल्पकार',
    selectLanguage: 'ऐप और ऑडियो भाषा',
    marketAccessTips: 'बाज़ार सहायता एवं सरकारी योजनाएं',
    speakToCreateListing: 'बोलकर उत्पाद बनाएं',
    useVoiceInstead: 'या बोलकर लिस्टिंग बनाएं (हिंदी / तेलुगु / अंग्रेजी)',
    usePhotoInstead: 'या कैमरे / फोटो से बनाएं',
    voiceRecordingTitle: 'बोलकर उत्पाद की लिस्टिंग बनाएं',
    voiceRecordingSubtitle: 'अपनी मातृभाषा में अपने हस्तशिल्प के बारे में सहजता से बोलें। AI पूरी कैटलॉग लिस्टिंग तैयार करेगा।',
    listeningStatus: 'सुन रहा है... (अब बोलें)',
    stopRecording: 'बोलना समाप्त (रोकें)',
    startRecording: 'बोलने के लिए माइक दबाएं',
    reviewSpokenText: 'बोले गए विवरण की समीक्षा करें',
    editSpokenTextPlaceholder: 'आपके बोले गए शब्द यहां दिखेंगे। आप ज़रूरत अनुसार इसमें बदलाव भी कर सकते हैं...',
    generateFromVoice: 'AI द्वारा लिस्टिंग तैयार करें',
    reRecord: 'दोबारा बोलें',
    voiceHelpTips: 'बोलते समय इन बातों का उल्लेख करें:',
    voiceTip1: 'आपकी शिल्प वस्तु क्या है (जैसे मिट्टी का दीया, हाथ से बुनी साड़ी, पीतल की मूर्ति)?',
    voiceTip2: 'कौन सी प्राकृतिक सामग्री और रंगों का उपयोग हुआ है?',
    voiceTip3: 'इसे बनाने में कितना समय या कारीगरी लगी?',
    voiceTip4: 'आपकी अपेक्षित उचित कीमत क्या है?',
    voiceSamplesTitle: 'या इनमें से कोई नमूना वाक्य चुनकर देखें:',
    publishListing: 'मार्केटप्लेस में प्रकाशित करें (Publish)',
    publishingListing: 'मार्केटप्लेस में प्रकाशित हो रहा है...',
    publishingSuccess: '🎉 आपका उत्पाद अब KarigarX मार्केटप्लेस पर लाइव है!',
    publishedBadge: 'LIVE',
    myListings: 'मेरी लिस्टिंग्स',
    viewProduct: 'उत्पाद देखें',
    viewInMarketplace: 'मार्केटप्लेस में देखें',
    editListing: 'लिस्टिंग बदलें',
    deleteListing: 'हटाएं',
    artisanNameLabel: 'कारीगर का नाम',
    artisanLocationLabel: 'शिल्प क्षेत्र / स्थान',
    buyerEnquiry: 'कारीगर से व्हाट्सएप पर बात करें',
    verifiedArtisanBadge: 'प्रमाणित कारीगर',
    fairPriceBreakdown: 'उचित मूल्य व कारीगर गारंटी',
    directFromArtisan: '100% कारीगर से सीधा • 0% कमीशन',
    actionCamera: 'कैमरा',
    actionCameraDesc: 'शिल्प का फोटो खींचें',
    actionSpeak: 'बोलें',
    actionSpeakDesc: 'आवाज से शिल्प जोड़ें',
    actionProducts: 'मेरे उत्पाद',
    actionProductsDesc: 'कैटलॉग और स्टोर',
    actionOrders: 'ऑर्डर',
    actionOrdersDesc: 'ग्राहक के ऑर्डर देखें',
    actionEarnings: 'कमाई',
    actionEarningsDesc: 'कुल बिक्री और पैसा',
    actionHelp: 'मदद',
    actionHelpDesc: 'फोटो और बोलकर सीखें',
    flowShowUs: 'दिखाएं',
    flowTellUs: 'बताएं',
    flowWeCreate: 'AI बनाएगा',
    flowYouSell: 'आप बेचें',
    flowYouEarn: 'आप कमाएं',
    photoGuideTitle: 'फोटो लेने का सही तरीका',
    photoDark: 'अंधेरा (खराब)',
    photoBlurry: 'धुंधला (खराब)',
    photoClear: 'साफ व चमकदार (सही)',
    adjustPriceVisual: 'दाम बदलने के लिए + या - दबाएं',
    orderStepReceived: 'ऑर्डर मिला',
    orderStepShipped: 'भेज दिया',
    orderStepDelivered: 'पहुंच गया',
    listenAudioHelp: 'आवाज में सुनें',
  },
  te: {
    appTitle: 'KarigarX',
    appSubtitle: 'చేతివృత్తుల వారి కోసం AI కేటలాగ్ & మార్కెట్ యాక్సెస్',
    badgeSih: 'KarigarX AI',
    navHome: 'హోమ్',
    navScan: 'లిస్టింగ్ సృష్టించండి',
    navCatalog: 'నా కేటలాగ్',
    navProfile: 'ప్రొఫైల్',
    homeHeadline: 'మీ చేతిపనిని మార్కెట్-సిద్ధమైన ఉత్పత్తిగా మార్చండి',
    homeSubtitle: 'గ్రామీణ కళాకారులు & నేత కార్మికుల కోసం AI కేటలాగింగ్ సాధనం.',
    scanYourProduct: 'ఉత్పత్తిని స్కాన్ చేయండి',
    uploadFromGallery: 'గ్యాలరీ నుండి అప్‌లోడ్',
    recentItems: 'ఇటీవల రూపొందించిన ఉత్పత్తులు',
    noRecentItems: 'ఇంకా ఉత్పత్తులు లేవు',
    noRecentItemsDesc: 'సరసమైన ధర మరియు పూర్తి వివరాలను పొందడానికి ఫోటో తీయండి లేదా మాట్లాడండి.',
    viewAllCatalog: 'మొత్తం కేటలాగ్ చూడండి',
    scanProduct: 'ఉత్పత్తి లిస్టింగ్ రూపొందించండి',
    openCamera: 'కెమెరాతో ఫోటో తీయండి',
    uploadPhoto: 'గ్యాలరీ నుండి ఫోటో ఎంచుకోండి',
    trySamplePhoto: 'లేదా నమూనా హస్తకళను పరీక్షించండి:',
    sampleItems: 'నమూనా కళలు',
    analyzingTitle: 'KarigarX AI మీ ఉత్పత్తిని విశ్లేషిస్తోంది...',
    analyzingStep1: 'సాంప్రదాయ కళా శైలిని గుర్తిస్తోంది...',
    analyzingStep2: 'ముడి పదార్థాలు & రంగులను గుర్తిస్తోంది...',
    analyzingStep3: 'సరసమైన మార్కెట్ ధరను (₹) అంచనా వేస్తోంది...',
    analyzingStep4: 'అమ్మకాల ముఖ్యాంశాలు మరియు ట్యాగ్‌లను రూపొందిస్తోంది...',
    timeRemainingEstimate: 'సుమారు 15-20 సెకన్లలో పూర్తి వివరాలు సిద్ధమవుతాయి',
    productCardTitle: 'KarigarX AI రూపొందించిన వివరాలు',
    category: 'వర్గం (Category)',
    craftStyle: 'కళా శైలి / సాంప్రదాయం',
    materials: 'ఉపయోగించిన పదార్థాలు',
    colors: 'ప్రధాన రంగులు',
    description: 'ఉత్పత్తి కథ & వివరణ',
    keySellingPoints: '3 ముఖ్యమైన అమ్మకపు అంశాలు',
    targetAudience: 'లక్ష్య వినియోగదారులు',
    suitableMarket: 'అనువైన మార్కెట్',
    suggestedPrice: 'సూచించిన అమ్మకపు ధర',
    priceRange: 'సరసమైన ధర పరిధి',
    tagsKeywords: 'శోధన ట్యాగ్‌లు (Tags)',
    artisanTip: 'వ్యాపార చిట్కా',
    editDetails: 'లిస్టింగ్ సవరించండి',
    saveToCatalog: 'కేటలాగ్‌లో భద్రపరచండి',
    savedToCatalog: 'కేటలాగ్‌లో భద్రపరచబడింది ✓',
    scanAnother: 'మరొక ఉత్పత్తిని సృష్టించండి',
    shareCard: 'వాట్సాప్‌లో పంపండి',
    viewCatalog: 'నా కేటలాగ్ చూడండి',
    myCatalog: 'నా చేతివృత్తుల కేటలాగ్',
    emptyCatalogTitle: 'ఇంకా ఉత్పత్తులు లేవు',
    emptyCatalogDesc: 'మీ చేతితో చేసిన ఉత్పత్తులను స్కాన్ చేసి లేదా మాట్లాడి డిజిటల్ కేటలాగ్‌ను నిర్మించండి.',
    startScanning: 'మొదటి ఉత్పత్తిని సృష్టించండి',
    speakDetails: 'వివరాలను వినండి (Audio)',
    stopSpeaking: 'ఆడియో ఆపండి',
    close: 'మూసివేయి',
    saveChanges: 'మార్పులను భద్రపరచు',
    cancel: 'రద్దు చేయి',
    cameraPermissionError: 'దయచేసి కెమెరా అనుమతిని మంజూరు చేయండి లేదా గ్యాలరీ నుండి ఎంచుకోండి.',
    switchCamera: 'కెమెరా మార్చండి',
    capturePhoto: 'ఫోటో తీయండి',
    retakePhoto: 'మళ్లీ తీయండి',
    marketLocal: 'స్థానిక సంతలు / హాట్స్',
    marketRetail: 'రిటైల్ & బొటిక్స్',
    marketWholesale: 'హోల్‌సేల్ & బహుమతులు',
    marketExport: 'ఎగుమతి మార్కెట్లు',
    whatsappShareText: 'ఈ అద్భుతమైన చేతివృత్తి ఉత్పత్తిని చూడండి (KarigarX)!',
    copiedToClipboard: 'వివరాలు కాపీ చేయబడ్డాయి!',
    deleteItem: 'తొలగించు',
    profileTitle: 'చేతివృత్తిదారు ప్రొఫైల్ & సెట్టింగ్‌లు',
    artisanName: 'మాస్టర్ కళాకారుడు',
    artisanBadge: 'గుర్తింపు పొందిన భారతీయ చేతివృత్తిదారుడు',
    selectLanguage: 'యాప్ & వాయిస్ భాష',
    marketAccessTips: 'మార్కెట్ యాక్సెస్ & ప్రభుత్వ పథకాలు',
    speakToCreateListing: 'మాట్లాడి లిస్టింగ్ రూపొందించండి',
    useVoiceInstead: 'లేదా వాయిస్ ఉపయోగించండి (తెలుగు / హిందీ / ఇంగ్లీష్)',
    usePhotoInstead: 'లేదా ఫోటో / కెమెరా ఉపయోగించండి',
    voiceRecordingTitle: 'మాట్లాడి ఉత్పత్తి లిస్టింగ్ రూపొందించండి',
    voiceRecordingSubtitle: 'మీ హస్తకళ గురించి మీ మాతృభాషలో మాట్లాడండి. AI పూర్తి కేటలాగ్‌ను తయారు చేస్తుంది.',
    listeningStatus: 'వింటోంది... (ఇప్పుడు మాట్లాడండి)',
    stopRecording: 'మాట్లాడటం పూర్తయింది (ఆపండి)',
    startRecording: 'మాట్లాడటానికి మైక్ నొక్కండి',
    reviewSpokenText: 'మాట్లాడిన వివరాలను సమీక్షించండి',
    editSpokenTextPlaceholder: 'మీరు మాట్లాడిన పదాలు ఇక్కడ కనిపిస్తాయి. మీరు అదనపు వివరాలను టైప్ లేదా సవరించవచ్చు...',
    generateFromVoice: 'AI తో లిస్టింగ్ రూపొందించండి',
    reRecord: 'మళ్లీ రికార్డ్ చేయండి',
    voiceHelpTips: 'మాట్లాడేటప్పుడు చెప్పాల్సిన విషయాలు:',
    voiceTip1: 'మీ ఉత్పత్తి ఏమిటి (ఉదాహరణకు మట్టి కుండ, చేనేత చీర, ఇత్తడి దీపం)?',
    voiceTip2: 'ఏ ముడి పదార్థాలు మరియు సహజ రంగులు వాడారు?',
    voiceTip3: 'తయారు చేయడానికి ఎంత సమయం పట్టింది?',
    voiceTip4: 'మీరు ఆశించే సరసమైన ధర ఎంత?',
    voiceSamplesTitle: 'లేదా ఈ నమూనా వాక్యాలలో ఒకదాన్ని ఎంచుకోండి:',
    publishListing: 'మార్కెట్‌ప్లేస్‌లో ప్రచురించండి (Publish)',
    publishingListing: 'మార్కెట్‌ప్లేస్‌లో ప్రచురించబడుతోంది...',
    publishingSuccess: '🎉 మీ ఉత్పత్తి ఇప్పుడు KarigarX మార్కెట్‌ప్లేస్‌లో ప్రత్యక్ష ప్రసారంలో ఉంది!',
    publishedBadge: 'LIVE',
    myListings: 'నా లిస్టింగ్‌లు',
    viewProduct: 'ఉత్పత్తి చూడండి',
    viewInMarketplace: 'మార్కెట్‌ప్లేస్‌లో చూడండి',
    editListing: 'లిస్టింగ్ సవరించండి',
    deleteListing: 'తొలగించు',
    artisanNameLabel: 'కళాకారుడి పేరు',
    artisanLocationLabel: 'ప్రాంతం',
    buyerEnquiry: 'కళాకారుడిని వాట్సాప్‌లో సంప్రదించండి',
    verifiedArtisanBadge: 'ధృవీకరించబడిన కళాకారుడు',
    fairPriceBreakdown: 'సరసమైన ధర & నాణ్యత హామీ',
    directFromArtisan: '100% కళాకారుడి నుండి నేరుగా • 0% కమీషన్',
    actionCamera: 'కెమెరా',
    actionCameraDesc: 'ఫోటో తీయండి',
    actionSpeak: 'మాట్లాడండి',
    actionSpeakDesc: 'నోటి మాటతో చేర్చండి',
    actionProducts: 'నా ఉత్పత్తులు',
    actionProductsDesc: 'కేటలాగ్ మరియు స్టోర్',
    actionOrders: 'ఆర్డర్లు',
    actionOrdersDesc: 'కొనుగోలు ఆర్డర్లు',
    actionEarnings: 'ఆదాయం',
    actionEarningsDesc: 'డబ్బు & అమ్మకాలు',
    actionHelp: 'సహాయం',
    actionHelpDesc: 'ఆడియో & దృశ్య గైడ్',
    flowShowUs: 'చూపించండి',
    flowTellUs: 'చెప్పండి',
    flowWeCreate: 'AI చేస్తుంది',
    flowYouSell: 'అమ్మండి',
    flowYouEarn: 'సంపాదించండి',
    photoGuideTitle: 'మంచి ఫోటో తీసుకునే విధానం',
    photoDark: 'చీకటి (వద్దు)',
    photoBlurry: 'మసక (వద్దు)',
    photoClear: 'స్పష్టం (సరియైనది)',
    adjustPriceVisual: 'ధర మార్చడానికి + లేదా - నొక్కండి',
    orderStepReceived: 'ఆర్డర్ వచ్చింది',
    orderStepShipped: 'పంపబడింది',
    orderStepDelivered: 'చేరింది',
    listenAudioHelp: 'ఆడియో వినండి',
  },
  ta: {
    appTitle: 'KarigarX',
    appSubtitle: 'கைவினைஞர்களுக்கான AI பட்டியல் & சந்தை அணுகல்',
    badgeSih: 'KarigarX AI',
    navHome: 'முகப்பு',
    navScan: 'பட்டியல் உருவாக்கு',
    navCatalog: 'என் பட்டியல்',
    navProfile: 'சுயவிவரம்',
    homeHeadline: 'உங்கள் கைவினைப் பொருளை சந்தைக்குத் தயாரான தயாரிப்பாக மாற்றுங்கள்',
    homeSubtitle: 'கைவினைஞர்களுக்கான AI-இயங்கும் பட்டியல் மற்றும் நியாய விலை வழிகாட்டி.',
    scanYourProduct: 'பொருளை ஸ்கேன் செய்',
    uploadFromGallery: 'கேலரியில் இருந்து பதிவேற்று',
    recentItems: 'சமீபத்திய தயாரிப்புகள்',
    noRecentItems: 'பொருட்கள் எதுவும் இல்லை',
    noRecentItemsDesc: 'நியாயமான விலை மற்றும் முழு விவரங்களை பெற படம் எடுக்கவும் அல்லது பேசவும்.',
    viewAllCatalog: 'முழு பட்டியலையும் காண்க',
    scanProduct: 'தயாரிப்பு பட்டியல் உருவாக்கு',
    openCamera: 'கேமரா மூலம் படம் எடு',
    uploadPhoto: 'கேலரியில் இருந்து பதிவேற்று',
    trySamplePhoto: 'அல்லது மாதிரி கைவினைப் பொருளை சோதிக்கவும்:',
    sampleItems: 'மாதிரி கைவினைப்பொருட்கள்',
    analyzingTitle: 'KarigarX AI உங்கள் தயாரிப்பை பகுப்பாய்வு செய்கிறது...',
    analyzingStep1: 'பாரம்பரிய கைவினைப் பாணியை அடையாளம் காண்கிறது...',
    analyzingStep2: 'மூலப்பொருட்கள் மற்றும் வண்ணங்களை கண்டறிகிறது...',
    analyzingStep3: 'நியாயமான சந்தை விலையைக் கணக்கிடுகிறது (₹)...',
    analyzingStep4: 'விற்பனை சிறப்பம்சங்கள் மற்றும் குறிச்சொற்களை உருவாக்குகிறது...',
    timeRemainingEstimate: 'சுமார் 15-20 வினாடிகளில் முழு விவரங்கள் தயாராகும்',
    productCardTitle: 'KarigarX AI உருவாக்கிய தயாரிப்பு விவரங்கள்',
    category: 'பிரிவு (Category)',
    craftStyle: 'கைவினை பாணி / பாரம்பரியம்',
    materials: 'பயன்படுத்தப்பட்ட பொருட்கள்',
    colors: 'முக்கிய வண்ணங்கள்',
    description: 'தயாரிப்பு கதை & விளக்கம்',
    keySellingPoints: '3 முக்கிய விற்பனை சிறப்பம்சங்கள்',
    targetAudience: 'இலக்கு வாடிக்கையாளர்கள்',
    suitableMarket: 'பொருத்தமான சந்தை',
    suggestedPrice: 'பரிந்துரைக்கப்பட்ட விற்பனை விலை',
    priceRange: 'நியாயமான விலை வரம்பு',
    tagsKeywords: 'தேடல் குறிச்சொற்கள் (Tags)',
    artisanTip: 'கைவினைஞர் வணிக உதவிக்குறிப்பு',
    editDetails: 'பட்டியலை திருத்து',
    saveToCatalog: 'பட்டியலில் சேமி',
    savedToCatalog: 'பட்டியலில் சேமிக்கப்பட்டது ✓',
    scanAnother: 'மற்றொரு தயாரிப்பை உருவாக்கு',
    shareCard: 'பகிர் / WhatsApp',
    viewCatalog: 'என் பட்டியலை காண்க',
    myCatalog: 'என் கைவினை பட்டியல்',
    emptyCatalogTitle: 'இன்னும் பொருட்கள் சேமிக்கப்படவில்லை',
    emptyCatalogDesc: 'உங்கள் கைவினைப் பொருட்களை ஸ்கேன் செய்து அல்லது பேசி டிஜிட்டல் பட்டியலை உருவாக்குங்கள்.',
    startScanning: 'முதல் பொருளை உருவாக்கு',
    speakDetails: 'விவரங்களை கேளுங்கள் (Audio)',
    stopSpeaking: 'ஆடியோவை நிறுத்து',
    close: 'மூடு',
    saveChanges: 'மாற்றங்களை சேமி',
    cancel: 'ரத்து செய்',
    cameraPermissionError: 'தயவுசெய்து கேமரா அனுமதியை வழங்கவும் அல்லது கேலரியில் இருந்து தேர்வு செய்யவும்.',
    switchCamera: 'கேமராவை மாற்று',
    capturePhoto: 'படம் எடு',
    retakePhoto: 'மீண்டும் எடு',
    marketLocal: 'உள்ளூர் சந்தைகள் / ஹாட்ஸ்',
    marketRetail: 'சில்லறை விற்பனை & பொட்டிக்குகள்',
    marketWholesale: 'மொத்த விற்பனை & பரிசுகள்',
    marketExport: 'ஏற்றுமதி சந்தை',
    whatsappShareText: 'இந்த கைவினைப் பொருளைப் பாருங்கள் (KarigarX)!',
    copiedToClipboard: 'விவரங்கள் நகலெடுக்கப்பட்டது!',
    deleteItem: 'நீக்கு',
    profileTitle: 'கைவினைஞர் சுயவிவரம் & அமைப்புகள்',
    artisanName: 'முதுநிலை கைவினைஞர்',
    artisanBadge: 'சான்றளிக்கப்பட்ட இந்திய கைவினைஞர்',
    selectLanguage: 'செயலி & ஆடியோ மொழி',
    marketAccessTips: 'சந்தை அணுகல் மற்றும் அரசு திட்டங்கள்',
    speakToCreateListing: 'பேசி பட்டியலை உருவாக்கவும்',
    useVoiceInstead: 'அல்லது குரல் மூலம் பதிவு செய்யவும் (தமிழ் / இந்தி / ஆங்கிலம்)',
    usePhotoInstead: 'அல்லது புகைப்படம் மூலம் பதிவு செய்யவும்',
    voiceRecordingTitle: 'பேசி தயாரிப்பு பட்டியலை உருவாக்கவும்',
    voiceRecordingSubtitle: 'உங்கள் கைவினைப் பற்றி உங்கள் தாய்மொழியில் பேசுங்கள். AI முழு பட்டியலையும் உருவாக்கும்.',
    listeningStatus: 'கேட்கிறது... (இப்போது பேசுங்கள்)',
    stopRecording: 'பேசி முடிந்தது (நிறுத்து)',
    startRecording: 'பேச மைக்கை அழுத்தவும்',
    reviewSpokenText: 'பேசிய விவரங்களை சரிபார்க்கவும்',
    editSpokenTextPlaceholder: 'உங்கள் குரல் வார்த்தைகள் இங்கே தோன்றும். நீங்கள் திருத்தலாம்...',
    generateFromVoice: 'AI மூலம் பட்டியலை உருவாக்கவும்',
    reRecord: 'மீண்டும் பதிவு செய்',
    voiceHelpTips: 'பேசும்போது குறிப்பிட வேண்டியவை:',
    voiceTip1: 'உங்கள் பொருள் என்ன (எ.கா. மண்பானை, கைத்தறி சேலை, பித்தளை விளக்கு)?',
    voiceTip2: 'என்ன பொருட்கள் மற்றும் இயற்கை வண்ணங்கள் பயன்படுத்தப்பட்டன?',
    voiceTip3: 'இதைச் செய்ய எவ்வளவு நேரம் எடுத்தது?',
    voiceTip4: 'உங்கள் எதிர்பார்ப்பு விலை என்ன?',
    voiceSamplesTitle: 'அல்லது மாதிரி வாக்கியத்தைத் தேர்வு செய்யவும்:',
    publishListing: 'சந்தையில் வெளியிடு (Publish)',
    publishingListing: 'சந்தையில் வெளியிடப்படுகிறது...',
    publishingSuccess: '🎉 உங்கள் தயாரிப்பு இப்போது KarigarX சந்தையில் நேரலையில் உள்ளது!',
    publishedBadge: 'LIVE',
    myListings: 'என் பட்டியல்கள்',
    viewProduct: 'தயாரிப்பை காண்க',
    viewInMarketplace: 'சந்தையில் காண்க',
    editListing: 'பட்டியலை திருத்து',
    deleteListing: 'நீக்கு',
    artisanNameLabel: 'கைவினைஞர் பெயர்',
    artisanLocationLabel: 'இடம் / பகுதி',
    buyerEnquiry: 'WhatsApp மூலம் கைவினைஞரைத் தொடர்பு கொள்ளவும்',
    verifiedArtisanBadge: 'சான்றளிக்கப்பட்ட கைவினைஞர்',
    fairPriceBreakdown: 'நியாய விலை மற்றும் உத்தரவாதம்',
    directFromArtisan: '100% கைவினைஞரிடமிருந்து நேரடியாக • 0% கமிஷன்',
    actionCamera: 'கேமரா',
    actionCameraDesc: 'புகைப்படம் எடு',
    actionSpeak: 'பேசவும்',
    actionSpeakDesc: 'குரல் மூலம் சேர்',
    actionProducts: 'என் பொருட்கள்',
    actionProductsDesc: 'பட்டியல் & கடை',
    actionOrders: 'ஆர்டர்கள்',
    actionOrdersDesc: 'வாடிக்கையாளர் ஆர்டர்கள்',
    actionEarnings: 'வருமானம்',
    actionEarningsDesc: 'விற்பனை & பணம்',
    actionHelp: 'உதவி',
    actionHelpDesc: 'பட & ஆடியோ உதவி',
    flowShowUs: 'காட்டுங்கள்',
    flowTellUs: 'சொல்லுங்கள்',
    flowWeCreate: 'AI உருவாக்கும்',
    flowYouSell: 'விற்பனை',
    flowYouEarn: 'வருமானம்',
    photoGuideTitle: 'புகைப்படம் வழிகாட்டி',
    photoDark: 'இருட்டு (தவறு)',
    photoBlurry: 'மங்கலானது (தவறு)',
    photoClear: 'தெளிவானது (சரி)',
    adjustPriceVisual: 'விலையை மாற்ற + அல்லது - அழுத்தவும்',
    orderStepReceived: 'ஆர்டர் பெறப்பட்டது',
    orderStepShipped: 'அனுப்பப்பட்டது',
    orderStepDelivered: 'சேர்க்கப்பட்டது',
    listenAudioHelp: 'ஆடியோ உதவி',
  },
};

