import { EmergencyData, Hospital } from '../types';

export const emergencies: EmergencyData[] = [
  {
    id: 'choking',
    titleEn: 'Choking',
    titleKn: 'ಗಂಟಲಲ್ಲಿ ಆಹಾರ ಸಿಕ್ಕಿಕೊಂಡರೆ',
    titleHi: 'दम घुटना (गले में अटकना)',
    titleTe: 'గొంతులో అడ్డంకి',
    titleTa: 'மூச்சுத்திணறல்',
    icon: 'Wind',
    color: 'bg-orange-500',
    steps: [
      {
        textEn: 'Encourage to cough: If they can cough forcefully, encourage them to keep coughing to clear the airway.',
        textKn: 'ಕೆಮ್ಮಲು ಪ್ರೋತ್ಸಾಹಿಸಿ: ಅವರು ಬಲವಾಗಿ ಕೆಮ್ಮಲು ಸಾಧ್ಯವಾದರೆ, ಕೆಮ್ಮುತ್ತಲೇ ಇರಲು ಪ್ರೋತ್ಸಾಹಿಸಿ.',
        textHi: 'खांसने के लिए प्रोत्साहित करें: यदि वे जोर से खांस सकते हैं, तो उन्हें वायुमार्ग साफ करने के लिए खांसते रहने के लिए प्रोत्साहित करें।',
        textTe: 'దగ్గుకు ప్రోత్సహించండి: వారు బలంగా దగ్గుగలిగితే, వాయుమార్గాన్ని శుభ్రం చేయడానికి దగ్గుతూనే ఉండమని ప్రోత్సహించండి.',
        textTa: 'இருக்கச் சொல்லுங்கள்: அவர்களால் பலமாக இரும முடிந்தால், சுவாசப் பாதையைச் சீராக்கத் தொடர்ந்து இருமுமாறு ஊக்குவிக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Give up to 5 firm back blows between the shoulder blades with the heel of your hand.',
        textKn: 'ಕೈಯಿಂದ ಭುಜದ ಎಲುಬುಗಳ ನಡುವೆ 5 ಬಲವಾದ ಬೆನ್ನು ಬಡಿತಗಳನ್ನು ನೀಡಿ.',
        textHi: 'अपनी हथेली के निचले हिस्से से कंधे की हड्डियों के बीच 5 जोर से बैक ब्लो दें।',
        textTe: 'మీ అరచేతితో భుజాల మధ్య 5 బలమైన బ్యాక్ బ్లోస్ ఇవ్వండి.',
        textTa: 'உங்கள் கையின் அடிப்பகுதியால் தோள்பட்டை எலும்புகளுக்கு இடையில் 5 பலமான முதுகுத் தாக்குதல்களைக் கொடுக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Perform 5 abdominal thrusts (Heimlich): Place fist above navel and pull inward and upward.',
        textKn: '5 ಕಿಬ್ಬೊಟ್ಟೆಯ ಒತ್ತಡಗಳನ್ನು (ಹೈಮ್ಲಿಚ್) ನಿರ್ವಹಿಸಿ: ಹೊಕ್ಕುಳ ಮೇಲೆ ಮುಷ್ಟಿ ಮಾಡಿ ಒಳಕ್ಕೆ ಮತ್ತು ಮೇಲಕ್ಕೆ ಎಳೆಯಿರಿ.',
        textHi: '5 एब्डोमिनल थ्रस्ट्स (हेमलिच) करें: नाभि के ऊपर मुट्ठी रखें और अंदर और ऊपर की ओर खींचें।',
        textTe: '5 అబ్డామినల్ థ్రస్ట్‌లు (హీమ్లిచ్) చేయండి: నాభి పైన పిడికిలిని ఉంచి లోపలికి మరియు పైకి లాగండి.',
        textTa: '5 வயிற்றுத் தள்ளுதல்களை (ஹெய்ம்லிச்) செய்யுங்கள்: தொப்புளுக்கு மேலே முஷ்டியை வைத்து உள்நோக்கியும் மேல்நோக்கியும் இழுக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Repeat 5-and-5 (back blows and thrusts) until the object is forced out or they become unconscious.',
        textKn: 'ವಸ್ತುವು ಹೊರಬರುವವರೆಗೆ ಅಥವಾ ಅವರು ಪ್ರಜ್ಞಾಹೀನರಾಗುವವರೆಗೆ 5-ಮತ್ತು-5 ಪುನರಾವರ್ತಿಸಿ.',
        textHi: 'जब तक वस्तु बाहर न निकल जाए या वे बेहोश न हो जाएं तब तक 5-और-5 दोहराएं।',
        textTe: 'వస్తువు బయటకు వచ్చే వరకు లేదా వారు స్పృహ కోల్పోయే వరకు 5-మరియు-5 పునరావృతం చేయండి.',
        textTa: 'பொருள் வெளியே வரும் வரை அல்லது அவர்கள் மயக்கமடையும் வரை 5-மற்றும்-5 திரும்பத் திரும்பச் செய்யுங்கள்.',
        type: 'info'
      },
      {
        textEn: 'If unconscious or object doesn\'t come out, call emergency services (108/112) and start CPR if trained.',
        textKn: 'ಪ್ರಜ್ಞೆ ತಪ್ಪಿದರೆ ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ.',
        textHi: 'यदि बेहोश हो जाएं, तो तुरंत 108 पर कॉल करें।',
        textTe: 'స్పృహ కోల్పోతే వెంటనే 108 కి కాల్ చేయండి.',
        textTa: 'மயக்கமடைந்தால் உடனடியாக 108 ஐ அழைக்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'burn',
    titleEn: 'Burns',
    titleKn: 'ಸುಟ್ಟ ಗಾಯಗಳು',
    titleHi: 'जलना',
    titleTe: 'కాలిపోవడం',
    titleTa: 'தீக்காயங்கள்',
    icon: 'Flame',
    color: 'bg-red-500',
    steps: [
      {
        textEn: 'Immediately cool the burn with running cool (not ice-cold) water for 10-20 minutes.',
        textKn: 'ತಕ್ಷಣ ಸುಟ್ಟ ಭಾಗವನ್ನು 10-20 ನಿಮಿಷಗಳ ಕಾಲ ತಂಪಾದ ಹರಿಯುವ ನೀರಿನಲ್ಲಿ ಹಿಡಿಯಿರಿ.',
        textHi: 'तुरंत जले हुए क्षेत्र को 10-20 मिनट के लिए ठंडे बहते पानी के नीचे रखें।',
        textTe: 'వెంటనే కాలిపోయిన భాగాన్ని 10-20 నిమిషాల పాటు చల్లని ప్రవహించే నీటి కింద ఉంచండి.',
        textTa: 'தீக்காயமடைந்த பகுதியை உடனடியாகக் குளிர்ந்த ஓடும் நீரின் கீழ் பிடித்திடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Remove jewelry or watches near the burned area before it starts to swell.',
        textKn: 'ಊತ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು ಉಂಗುರಗಳು ಅಥವಾ ವಾಚ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
        textHi: 'सूजन शुरू होने से पहले गहने या घड़ियां हटा दें।',
        textTe: 'వాపు రాకముందే నగలు లేదా గడియారాలను తీసివేయండి.',
        textTa: 'வீக்கம் தொடங்குவதற்கு முன்னரே நகைகள் அல்லது கடிகாரங்களை அகற்றிடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Do NOT apply butter, toothpaste, or ice. Clean with mild soap if skin is unbroken.',
        textKn: 'ಬೆಣ್ಣೆ ಅಥವಾ ಟೂತ್‌ಪೇಸ್ಟ್ ಹಚ್ಚಬೇಡಿ. ಚರ್ಮ ಒಡೆದಿಲ್ಲದಿದ್ದರೆ ಸೌಮ್ಯವಾದ ಸೋಪಿನಿಂದ ತೊಳೆಯಿರಿ.',
        textHi: 'मक्खन या टूथपेस्ट न लगाएं। यदि त्वचा सुरक्षित है तो हल्के साबुन से साफ करें।',
        textTe: 'వెన్న ಅಥವಾ ಟೂత్‌పేస్ట్ రాయకండి. చర్మం దెబ్బతినకపోతే సోపుతో కడగండి.',
        textTa: 'வெண்ணெய் அல்லது டூத்பேஸ்ட் தடவாதீர்கள். தோல் பாதிப்படையவில்லை என்றால் சோப்பால் கழுவவும்.',
        type: 'dont'
      },
      {
        textEn: 'Cover the burn with a clean, non-stick bandage or sterile cloth.',
        textKn: 'ಸುಟ್ಟ ಗಾಯವನ್ನು ಸ್ವಚ್ಛವಾದ ಬ್ಯಾಂಡೇಜ್ ಅಥವಾ ಬಟ್ಟೆಯಿಂದ ಮುಚ್ಚಿ.',
        textHi: 'जले हुए हिस्से को साफ पट्टी या कपड़े से ढकें।',
        textTe: 'కాలిపోయిన గాయాన్ని శుభ్రమైన బ్యాండేజీ లేదా గుడ్డతో కప్పండి.',
        textTa: 'தீக்காயத்தைச் சுத்தமான துணியால் மூடிடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Seek medical help immediately for severe burns or if large areas are affected.',
        textKn: 'ಗಾಯ ದೊಡ್ಡದಾಗಿದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: 'गंभीर जलन होने पर तुरंत चिकित्सा सहायता लें।',
        textTe: 'గాయం పెద్దదైనప్పుడు వెంటనే వైద్య సహాయం తీసుకోండి.',
        textTa: 'காயம் பெரிதாக இருந்தால் உடனடியாக மருத்துவ உதவி பெறவும்.',
        type: 'info'
      }
    ]
  },
  {
    id: 'snakebite',
    titleEn: 'Snake Bite',
    titleKn: 'ಹಾವು ಕಡಿತ',
    titleHi: 'साँप का काटना',
    titleTe: 'పాము కాటు',
    titleTa: 'பாம்பு கடி',
    icon: 'ShieldAlert',
    color: 'bg-emerald-600',
    steps: [
      {
        textEn: 'Stay calm and move away from the snake. Keep the victim still to slow venom spread.',
        textKn: 'ಶಾಂತವಾಗಿರಿ ಮತ್ತು ಹಾವಿನಿಂದ ದೂರವಿರಿ. ವಿಷ ಹರಡುವುದನ್ನು ತಡೆಯಲು ಚಲಿಸಬೇಡಿ.',
        textHi: 'शांत रहें और सांप से दूर हटें। जहर फैलने से रोकने के लिए पीड़ित को स्थिर रखें।',
        textTe: 'శాంతంగా ఉండండి మరియు పాముకు దూరంగా వెళ్లండి. బాధితుడిని కదలకుండా ఉంచండి.',
        textTa: 'அமைதியாக இருங்கள் மற்றும் பாம்பிலிருந்து தள்ளி இருங்கள். பாதிக்கப்பட்டவரை அசையாமல் வைத்திருங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Keep the bitten limb positioned at or below the level of the heart.',
        textKn: 'ಕಚ್ಚಲ್ಪಟ್ಟ ಅಂಗವನ್ನು ಹೃದಯದ ಮಟ್ಟದಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಕೆಳಗೆ ಇರಿಸಿ.',
        textHi: 'काटे गए अंग को हृदय के स्तर पर या उससे नीचे रखें।',
        textTe: 'కాటు వేసిన అవయవానిని గుండె స్థాయికి సమానంగా ఉంచండి.',
        textTa: 'கடிக்கப்பட்ட உறுப்பை இதயத்தின் மட்டத்திலோ அல்லது அதற்கு கீழேயோ வைத்திருங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Remove tight jewelry or clothing before swelling occurs.',
        textKn: 'ಊತ ಬರುವ ಮೊದಲು ಬಿಗಿಯಾದ ಒಡವೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
        textHi: 'सूजन होने से पहले तंग गहने या कपड़े हटा दें।',
        textTe: 'వాపు రాకముందే బిగుతైన నగలు లేదా దుస్తులను తీసివేయండి.',
        textTa: 'வீக்கம் ஏற்படுவதற்கு முன்பு இறுக்கமான நகைகளை அகற்றிடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Do NOT cut the wound, suck out venom, or apply a tight tourniquet.',
        textKn: 'ಗಾಯವನ್ನು ಕತ್ತರಿಸಬೇಡಿ, ವಿಷವನ್ನು ಹೀರಬೇಡಿ ಅಥವಾ ಬಿಗಿಯಾಗಿ ಕಟ್ಟಬೇಡಿ.',
        textHi: 'घाव को काटें नहीं, जहर न चूसें और न ही कसकर पट्टी बांधें।',
        textTe: 'గాయాన్ని కోయవద్దు, విషాన్ని పీల్చవద్దు లేదా గట్టిగా కట్టవద్దు.',
        textTa: 'காயத்தை வெட்ட வேண்டாம், விஷத்தை உறிஞ்ச வேண்டாம்.',
        type: 'dont'
      },
      {
        textEn: 'Rush to nearest hospital for anti-venom treatment immediately.',
        textKn: 'ತಕ್ಷಣ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಕರೆದೊಯ್ಯಿರಿ.',
        textHi: 'तुरंत निकटतम अस्पताल पहुंचें।',
        textTe: 'వెంటనే సమీప ఆస్పత్రికి వెళ్లండి.',
        textTa: 'உடனடியாக அருகிலுள்ள மருத்துவமனைக்குச் செல்லுங்கள்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'heartattack',
    titleEn: 'Heart Attack',
    titleKn: 'ಹೃದಯಾಘಾತ',
    titleHi: 'दिल का दौरा',
    titleTe: 'గుండెపోటు',
    titleTa: 'மாரடைப்பு',
    icon: 'HeartPulse',
    color: 'bg-rose-600',
    steps: [
      {
        textEn: 'Recognize symptoms: Chest pain, shortness of breath, cold sweat, or nausea.',
        textKn: 'ಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸಿ: ಎದೆ ನೋವು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆ.',
        textHi: 'लक्षणों को पहचानें: सीने में दर्द, सांस लेने में तकलीफ या पसीना आना।',
        textTe: 'లక్షణాలను గుర్తించండి: ఛాతీ నొప్పి లేదా శ్వాస తీసుకోవడంలో ఇబ్బంది.',
        textTa: 'அறிகுறிகளை அடையாளம் காணவும்: மார்பு வலி அல்லது மூச்சுத் திணறல்.',
        type: 'info'
      },
      {
        textEn: 'Call 108/112 immediately. Inform them it is a potential heart attack.',
        textKn: 'ತಕ್ಷಣ 108 ಕ್ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
        textHi: 'तुरंत 108 पर कॉल करें।',
        textTe: 'వెంటనే 108 కి కాల్ చేయండి.',
        textTa: 'உடனடியாக 108 ஐ அழைக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Help the person sit down and rest in a comfortable position.',
        textKn: 'ವ್ಯಕ್ತಿಯನ್ನು ಆರಾಮದಾಯಕವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ.',
        textHi: 'व्यक्ति को आराम से बैठने में मदद करें।',
        textTe: 'వ్యక్తిని సౌకర్యవంతంగా కూర్చోబెట్టండి.',
        textTa: 'நபரை வசதியாக அமர வைக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Give one 300mg Aspirin tablet to chew (if not allergic).',
        textKn: 'ಒಂದು ಆಸ್ಪಿರಿನ್ ಮಾತ್ರೆ ಅಗಿಯಲು ನೀಡಿ (ಅಲರ್ಜಿ ಇಲ್ಲದಿದ್ದರೆ).',
        textHi: 'एक एस्पिरिन की गोली चबाने के लिए दें (यदि एलर्जी न हो)।',
        textTe: 'ఒక ఆస్పిరిన్ టాబ్లెట్ నమలడానికి ఇవ్వండి.',
        textTa: 'ஒரு ஆஸ்பிரின் மாத்திரையை மென்று விழுங்கக் கொடுக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'If unconscious or stops breathing, start CPR immediately.',
        textKn: 'ಉಸಿರಾಟ ನಿಂತರೆ ತಕ್ಷಣ ಸಿಪಿಆರ್ ಪ್ರಾರಂಭಿಸಿ.',
        textHi: 'सांस रुकने पर तुरंत सीपीआर शुरू करें।',
        textTe: 'శ్వాస ఆగిపోతే వెంటనే సిపిఆర్ చేయండి.',
        textTa: 'சுவாசம் நின்றால் உடனடியாக சிபிஆர் தொடங்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'fracture',
    titleEn: 'Fracture',
    titleKn: 'ಮೂಳೆ ಮುರಿತ',
    titleHi: 'हड्डी टूटना (फ्रैक्चर)',
    titleTe: 'ఎముక విరగడం',
    titleTa: 'எலும்பு முறிவு',
    icon: 'Activity',
    color: 'bg-indigo-500',
    steps: [
      {
        textEn: 'Do NOT try to move or straighten the injured limb.',
        textKn: 'ಗಾಯಗೊಂಡ ಭಾಗವನ್ನು ಅಥವಾ ಮೂಳೆಯನ್ನು ನೇರಗೊಳಿಸಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.',
        textHi: 'घायल अंग को हिलाने या सीधा करने की कोशिश न करें।',
        textTe: 'విరిగిన భాగాన్ని కదపవద్దు లేదా తిన్నగా చేయడానికి ప్రయత్నించవద్దు.',
        textTa: 'காயமடைந்த பகுதியை அசைக்க வேண்டாம் அல்லது நேராக்க முயற்சிக்க வேண்டாம்.',
        type: 'dont'
      },
      {
        textEn: 'Apply a splint (rolled newspapers or board) to immobilize the area.',
        textKn: 'ಮೂಳೆಯನ್ನು ಸ್ಥಿರಗೊಳಿಸಲು ಹಲಗೆ ಅಥವಾ ಪತ್ರಿಕೆಗಳನ್ನು ಬಳಸಿ.',
        textHi: 'हड्डी को स्थिर करने के लिए पट्टी या लकड़ी का प्रयोग करें।',
        textTe: 'ఎముకను కదలకుండా ఉండటానికి స్ప్లింట్ ఉపయోగించండి.',
        textTa: 'எலும்பை அசையாமல் வைக்கப் பலகையைப் பயன்படுத்துங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Apply cold pack to reduction swelling and pain.',
        textKn: 'ನೋವು ಮತ್ತು ಊತ ಕಡಿಮೆ ಮಾಡಲು ಐಸ್ ಪ್ಯಾಕ್ ಬಳಸಿ.',
        textHi: 'दर्द और सूजन कम करने के लिए बर्फ का प्रयोग करें।',
        textTe: 'నొప్పి తగ్గించడానికి ఐస్ ప్యాక్ ఉంచండి.',
        textTa: 'வலியைக் குறைக்க ಐஸ் பேக் செய்திடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Keep the limb elevated and get medical attention immediately.',
        textKn: 'ಗಾಯಗೊಂಡ ಭಾಗವನ್ನು ಸ್ವಲ್ಪ ಮೇಲೆತ್ತಿ ಇರಿಸಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: 'अंग को ऊपर उठाकर रखें और तुरंत डॉक्टर को दिखाएं।',
        textTe: 'విరిగిన భాగాన్ని ఎత్తులో ఉంచి వైద్య సహాయం తీసుకోండి.',
        textTa: 'காயமடைந்த பகுதியை உயர்த்தி வைத்து மருத்துவ உதவி பெறவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'electricshock',
    titleEn: 'Electric Shock',
    titleKn: 'ವಿದ್ಯುತ್ ಶಾಕ್',
    titleHi: 'बिजली का झटका',
    titleTe: 'విద్యుత్ షాక్',
    titleTa: 'மின்சார அதிர்ச்சி',
    icon: 'Zap',
    color: 'bg-yellow-500',
    steps: [
      {
        textEn: 'Do NOT touch someone who is in contact with electricity.',
        textKn: 'ವಿದ್ಯುತ್ ಸಂಪರ್ಕದಲ್ಲಿರುವ ವ್ಯಕ್ತಿಯನ್ನು ಮುಟ್ಟಬೇಡಿ.',
        textHi: 'बिजली के संपर्क में आए व्यक्ति को न छुएं।',
        textTe: 'కరెంటు తగిలి ఉన్న వ్యక్తిని ముట్టుకోవద్దు.',
        textTa: 'மின்சாரத் தொடர்பில் இருக்கும் ஒருவரைத் தொடாதீர்கள்.',
        type: 'dont'
      },
      {
        textEn: 'Turn off the power source immediately if safe to do so.',
        textKn: 'ಸಾಧ್ಯವಾದರೆ ತಕ್ಷಣ ಪವರ್ ಆಫ್ ಮಾಡಿ.',
        textHi: 'यदि संभव हो तो तुरंत बिजली बंद कर दें।',
        textTe: 'వెంటనే పవర్ ఆఫ్ చేయండి.',
        textTa: 'மின்சாரத்தை உடனடியாக அணைக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Use non-conductive object like wood or plastic to move the source away.',
        textKn: 'ಮರ ಅಥವಾ ಪ್ಲಾಸ್ಟಿಕ್ ಬಳಸಿ ವ್ಯಕ್ತಿಯನ್ನು ವಿದ್ಯುತ್ ಸಂಪರ್ಕದಿಂದ ತಪ್ಪಿಸಿ.',
        textHi: 'बिजली के स्रोत को दूर हटाने के लिए लकड़ी या प्लास्टिक का प्रयोग करें।',
        textTe: 'చెక్క లేదా ప్లాస్టిక్ వస్తువుతో కరెంటు తీగను పక్కకు జరపండి.',
        textTa: 'மின்சாரக் கம்பியை அகற்ற মரம் அல்லது பிளாஸ்டிக் பொருளைப் பயன்படுத்தவும்.',
        type: 'do'
      },
      {
        textEn: 'Check breathing and responsiveness. Call 108/112 immediately.',
        textKn: 'ಉಸಿರಾಟ ಪರೀಕ್ಷಿಸಿ ಮತ್ತು 108 ಕ್ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
        textHi: 'सांस की जांच करें और 108 पर कॉल करें।',
        textTe: 'శ్వాసను తనిఖీ చేసి 108 కి కాల్ చేయండి.',
        textTa: 'சுவாசத்தைச் சோதித்து 108 ஐ அழைக்கவும்.',
        type: 'info'
      },
      {
        textEn: 'If not breathing, start CPR and continue until medical help arrives.',
        textKn: 'ಉಸಿರಾಟ ನಿಂತಿದ್ದರೆ ತಕ್ಷಣ ಸಿಪಿಆರ್ ಪ್ರಾರಂಭಿಸಿ.',
        textHi: 'यदि सांस नहीं ले रहे हैं, तो तुरंत सीपीआर शुरू करें।',
        textTe: 'శ్వాస అందకపోతే వెంటనే సిపిఆర్ చేయండి.',
        textTa: 'சுவாசம் இல்லை என்றால் உடனடியாக சிபிஆர் தொடங்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'nosebleed',
    titleEn: 'Nosebleed',
    titleKn: 'ಮೂಗಿನಲ್ಲಿ ರಕ್ತಸ್ರಾವ',
    titleHi: 'नाक से खून बहना',
    titleTe: 'ముక్కు నుండి రక్తం కారడం',
    titleTa: 'மூக்கில் இரத்த கசிவு',
    icon: 'Droplets',
    color: 'bg-red-700',
    steps: [
      {
        textEn: 'Sit upright and lean slightly forward. Do NOT tilt your head back.',
        textKn: 'ನೇರವಾಗಿ ಕುಳಿತು ಸ್ವಲ್ಪ ಮುಂದಕ್ಕೆ ಬಾಗಿರಿ. ತಲೆಯನ್ನು ಹಿಂದಕ್ಕೆ ಎತ್ತಬೇಡಿ.',
        textHi: 'सीधे बैठें और थोड़ा आगे झुकें। अपना सिर पीछे न झुकाएं।',
        textTe: 'నిటారుగా కూర్చుని కొంచెం ముందుకు వంగండి. తల వెనక్కి వంచవద్దు.',
        textTa: 'நேராக அமர்ந்து சிறிது முன்னோக்கிச் சாயுங்கள். தலையைப் பின்னால் சாய்க்காதீர்கள்.',
        type: 'do'
      },
      {
        textEn: 'Pinch the soft part of the nose for 10 minutes continuously.',
        textKn: 'ಮೂಗಿನ ಮೆದುವಾದ ಭಾಗವನ್ನು 10 ನಿಮಿಷಗಳ ಕಾಲ ನಿರಂತರವಾಗಿ ಒತ್ತಿ ಹಿಡಿಯಿರಿ.',
        textHi: 'नाक के कोमल हिस्से को 10 मिनट तक लगातार दबाकर रखें।',
        textTe: 'ముక్కు మెత్తని భాగాన్ని 10 నిమిషాల పాటు నొక్కండి.',
        textTa: 'மூக்கின் மென்மையான பகுதியை 10 நிமிடங்கள் தொடர்ந்து அழுத்தவும்.',
        type: 'do'
      },
      {
        textEn: 'Apply a cold pack to the bridge of the nose if available.',
        textKn: 'ಲಭ್ಯವಿದ್ದರೆ ಮೂಗಿನ ಮೇಲೆ ಐಸ್ ಪ್ಯಾಕ್ ಇರಿಸಿ.',
        textHi: 'यदि उपलब्ध हो तो नाक पर बर्फ की पट्टी लगाएं।',
        textTe: 'అందుబాటులో ఉంటే ఐస్ ప్యాక్ ఉంచండి.',
        textTa: 'கிடைத்தால் மூக்கின் மேல் ಐಸ್ பேக் செய்திடுங்கள்.',
        type: 'do'
      },
      {
        textEn: 'Do NOT lie down or pick/blow your nose after the bleeding stops.',
        textKn: 'ರಕ್ತಸ್ರಾವ ನಿಂತ ಮೇಲೆ ಮಲಗಬೇಡಿ ಅಥವಾ ಮೂಗು ಬೀಳಿಸಬೇಡಿ.',
        textHi: 'खून रुकने के बाद लेटें नहीं और नाक न झटकें।',
        textTe: 'రక్తం ఆగిపోయాక పడుకోవద్దు లేదా ముక్కు చీడవద్దు.',
        textTa: 'இரத்தக் கசிவு நின்ற பிறகு படுக்க வேண்டாம்.',
        type: 'dont'
      },
      {
        textEn: 'Seek medical help if bleeding lasts more than 20 minutes or follows heavy blow.',
        textKn: 'ರಕ್ತಸ್ರಾವ 20 ನಿಮಿಷಕ್ಕಿಂತ ಹೆಚ್ಚು ಕಾಲ ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
        textHi: 'यदि 20 मिनट बाद भी खून न रुके, तो डॉक्टर से मिलें।',
        textTe: '20 నిమిషాల కన్నా ఎక్కువ రక్తం కారితే డాక్టరును సంప్రదించండి.',
        textTa: 'இரத்தக் கசிவு 20 நிமிடங்களுக்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்.',
        type: 'info'
      }
    ]
  },
  {
    id: 'poisoning',
    titleEn: 'Poisoning',
    titleKn: 'ವಿಷ ಸೇವನೆ',
    titleHi: 'जहर खा लेना (विषाक्तता)',
    titleTe: 'విషం తీసుకోవడం',
    titleTa: 'விஷம் குடித்தல்',
    icon: 'Skull',
    color: 'bg-purple-700',
    steps: [
      {
        textEn: 'Try to identify what was taken and how much. Keep the container/bottle.',
        textKn: 'ಏನು ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ ಮತ್ತು ಎಷ್ಟು ಎಂದು ಗುರುತಿಸಲು ಪ್ರಯತ್ನಿಸಿ. ಆ ಡಬ್ಬಿ ಅಥವಾ ಬಾಟಲಿಯನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ.',
        textHi: 'पहचानने की कोशिश करें कि क्या और कितना लिया गया है। कंटेनर/बोतल को अपने पास रखें।',
        textTe: 'ఏమి తీసుకున్నారు మరియు ఎంత తీసుకున్నారో గుర్తించడానికి ప్రయత్నించండి. ఆ డబ్బా/సీసాను భద్రపరచండి.',
        textTa: 'என்ன உட்கொள்ளப்பட்டது மற்றும் எவ்வளவு என்று அடையாளம் காண முயற்சிக்கவும். கொள்கலன்/பாட்டிலை வைத்துக் கொள்ளுங்கள்.',
        type: 'info'
      },
      {
        textEn: 'Call Poison Control or 108 immediately.',
        textKn: 'ತಕ್ಷಣ ವಿಷ ನಿಯಂತ್ರಣ ಕೇಂದ್ರ ಅಥವಾ 108 ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.',
        textHi: 'तुरंत पॉइजन कंट्रोल या 108 पर कॉल करें।',
        textTe: 'వెంటనే పాయిజన్ కంట్రోల్ లేదా 108 కి కాల్ చేయండి.',
        textTa: 'உடனடியாக விஷக்கட்டுப்பாட்டு மையம் அல்லது 108 ஐ அழைக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Do NOT induce vomiting unless specifically instructed by a doctor.',
        textKn: 'ವೈದ್ಯರು ನಿರ್ದಿಷ್ಟವಾಗಿ ಸೂಚಿಸದ ಹೊರತು ವಾಂತಿ ಮಾಡಿಸಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.',
        textHi: 'जब तक डॉक्टर द्वारा विशेष रूप से निर्देश न दिया जाए, तब तक उल्टी न कराएं।',
        textTe: 'డాక్టర్ ప్రత్యేకంగా సూచిస్తే తప్ప వాంతి చేయించడానికి ప్రయత్నించవద్దు.',
        textTa: 'மருத்துவர் குறிப்பாக அறிவுறுத்தினாலொழிய வாந்தியைத் தூண்டாதீர்கள்.',
        type: 'dont'
      }
    ]
  },
  {
    id: 'stroke',
    titleEn: 'Stroke',
    titleKn: 'ಪಕ್ಷಪಾತ (ಪಾರ್ಶ್ವವಾಯು)',
    titleHi: 'लकवा (स्ट्रोक)',
    titleTe: 'పక్షవాతం (స్ట్రోక్)',
    titleTa: 'பக்கவாதம்',
    icon: 'Brain',
    color: 'bg-blue-800',
    steps: [
      {
        textEn: 'Use F.A.S.T: Face drooping, Arm weakness, Speech difficulty, Time to call 108.',
        textKn: 'F.A.S.T ಬಳಸಿ: ಮುಖ ಸೊಟ್ಟಗಾಗುವುದು, ಕೈ ದೌರ್ಬಲ್ಯ, ಮಾತು ತೊದಲುವಿಕೆ, ತಕ್ಷಣ ಕರೆ ಮಾಡುವ ಸಮಯ.',
        textHi: 'F.A.S.T का उपयोग करें: चेहरा लटकना, हाथ की कमजोरी, बोलने में कठिनाई, 108 पर कॉल करने का समय।',
        textTe: 'F.A.S.T ఉపయోగించండి: ముఖం వంకరపోవడం, చేయి బలహీనత, మాట తడబడటం, 108 కి కాల్ చేయాల్సిన సమయం.',
        textTa: 'F.A.S.T: முகம் கோணுதல், கை பலவீனம், பேச்சுத் தடுமாற்றம், 108 ஐ அழைக்கும் நேரம்.',
        type: 'info'
      },
      {
        textEn: 'Call 108 immediately. Time is brain tissue.',
        textKn: 'ತಕ್ಷಣ 108 ಕ್ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
        textHi: 'तुरंत 108 पर कॉल करें।',
        textTe: 'వెంటనే 108 కి కాల్ చేయండి.',
        textTa: 'உடனடியாக 108 ஐ அழைக்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'bleeding',
    titleEn: 'Severe Bleeding',
    titleKn: 'ತೀವ್ರ ರಕ್ತಸ್ರಾವ',
    titleHi: 'भारी रक्तस्राव',
    titleTe: 'తీవ్ర రక్తస్రావం',
    titleTa: 'கடுமையான இரத்தப்போக்கு',
    icon: 'Waves',
    color: 'bg-red-600',
    steps: [
      {
        textEn: 'Apply direct pressure with a clean cloth. Elevate the wound above the heart.',
        textKn: 'ಸ್ವಚ್ಛವಾದ ಬಟ್ಟೆಯಿಂದ ನೇರ ಒತ್ತಡ ಹೇರಿ. ಗಾಯವನ್ನು ಹೃದಯದ ಮಟ್ಟಕ್ಕಿಂತ ಮೇಲೆತ್ತಿ.',
        textHi: 'साफ कपड़े से सीधा दबाव डालें। घाव को हृदय के स्तर से ऊपर उठाएं।',
        textTe: 'శుభ్రమైన గుడ్డతో నేరుగా ఒత్తిడి తీసుకురండి. గాయాన్ని గుండె కంటే ఎత్తులో ఉంచండి.',
        textTa: 'சுத்தமான துணியால் அழுத்தம் கொடுக்கவும். காயத்தை இதயத்திற்கு மேலே உயர்த்தவும்.',
        type: 'do'
      },
      {
        textEn: 'If bleeding doesn\'t stop, apply a second cloth over the first. Do NOT remove original.',
        textKn: 'ರಕ್ತ ನಿಲ್ಲದಿದ್ದರೆ, ಮೊದಲನೆಯ ಬಟ್ಟೆಯ ಮೇಲೆ ಇನ್ನೊಂದು ಬಟ್ಟೆ ಇರಿಸಿ. ಮೊದಲ ಬಟ್ಟೆಯನ್ನು ತೆಗೆಯಬೇಡಿ.',
        textHi: 'यदि खून नहीं रुकता है, तो पहले के ऊपर दूसरा कपड़ा लगाएं। मूल कपड़े को न हटाएं।',
        textTe: 'రక్తం ఆగకపోతే, మొదటి గుడ్డపై రెండో గుడ్డ వేయండి. మొదటి గుడ్డను తీయవద్దు.',
        textTa: 'இரத்தம் நிற்கவில்லை என்றால், முதல் துணியின் மேல் மற்றொரு துணியை வைக்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'seizure',
    titleEn: 'Seizure',
    titleKn: 'ಫಿಟ್ಸ್ (ಮೂರ್ಛೆ)',
    titleHi: 'दौरे पड़ना (मिर्गी)',
    titleTe: 'మూర్ఛ (ఫిట్స్)',
    titleTa: 'வலிப்பு',
    icon: 'Waves',
    color: 'bg-indigo-600',
    steps: [
      {
        textEn: 'Clear the area of sharp objects. Place something soft under the head.',
        textKn: 'ಹರಿತವಾದ ವಸ್ತುಗಳನ್ನು ದೂರ ಸರಿಸಿ. ತಲೆಯ ಕೆಳಗೆ ಮೆತ್ತನೆಯ ವಸ್ತು ಇರಿಸಿ.',
        textHi: 'नुकीली चीजों को हटा दें। सिर के नीचे कोई मुलायम वस्तु रखें।',
        textTe: 'పదునైన వస్తువులను పక్కకు జరపండి. తల కింద మెత్తని వస్తువు ఉంచండి.',
        textTa: 'கூர்மையான பொருட்களை அப்புறப்படுத்தவும். தலைக்கு அடியில் மென்மையான பொருளை வைக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Do NOT put anything in their mouth or try to restrain them.',
        textKn: 'ಬಾಯಿಗೆ ಏನನ್ನೂ ಹಾಕಬೇಡಿ ಅಥವಾ ಅವರನ್ನು ಹಿಡಿಯಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.',
        textHi: 'उनके मुंह में कुछ न डालें और उन्हें रोकने की कोशिश न करें।',
        textTe: 'నోటిలో ఏమీ పెట్టవద్దు మరియు వారిని బలంగా పట్టుకోవద్దు.',
        textTa: 'வாயில் எதையும் வைக்க வேண்டாம் அல்லது அவர்களைக் கட்டுப்படுத்த முயற்சிக்க வேண்டாம்.',
        type: 'dont'
      }
    ]
  },
  {
    id: 'allergic',
    titleEn: 'Allergic Reaction',
    titleKn: 'ಅಲರ್ಜಿ',
    titleHi: 'एलर्जी (एनाफिलेक्सिस)',
    titleTe: 'అలెర్జీ',
    titleTa: 'ஒவ்வாமை',
    icon: 'Activity',
    color: 'bg-pink-600',
    steps: [
      {
        textEn: 'Check for hives, swelling of face/throat, or trouble breathing.',
        textKn: 'ಕಡಿತ, ಮುಖ ಅಥವಾ ಗಂಟಲು ಊತ, ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ.',
        textHi: 'पित्त, चेहरे/गले में सूजन या सांस लेने में परेशानी की जांच करें।',
        textTe: 'దద్దుర్లు, ముఖరపం/గొంతు వాపు లేదా శ్వాస ఇబ్బందులను గమనించండి.',
        textTa: 'தடிப்புகள், முகம்/தொண்டை வீக்கம் அல்லது மூச்சுத்திணறல் இருக்கிறதா என்று பார்க்கவும்.',
        type: 'info'
      },
      {
        textEn: 'Seek emergency help immediately if there is difficulty breathing.',
        textKn: 'ಉಸಿರಾಟಕ್ಕೆ ತೊಂದರೆಯಾದರೆ ತಕ್ಷಣ ತುರ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: 'सांस लेने में कठिनाई होने पर तुरंत आपातकालीन सहायता लें।',
        textTe: 'శ్వాస తీసుకోవడం ఇబ్బందిగా ఉంటే వెంటనే సహాయం కోరండి.',
        textTa: 'சுவாசிப்பதில் சிரமம் இருந்தால் உடனடியாக அவசர உதவியை நாடவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'diabetic',
    titleEn: 'Diabetic Emergency',
    titleKn: 'ಸಕ್ಕರೆ ಕಾಯಿಲೆ ತುರ್ತು',
    titleHi: 'मधुमेह आपातकाल',
    titleTe: 'డయాబెటిక్ ఎమర్జెన్సీ',
    titleTa: 'நீரிழிவு நோய் அவசரநிலை',
    icon: 'Thermometer',
    color: 'bg-cyan-600',
    steps: [
      {
        textEn: 'If conscious, give fruit juice, glucose water, or candy.',
        textKn: 'ಪ್ರಜ್ಞೆ ಇದ್ದರೆ, ಹಣ್ಣಿನ ರಸ, ಗ್ಲುಕೋಸ್ ನೀರು ಅಥವಾ ಮಿಠಾಯಿ ನೀಡಿ.',
        textHi: 'यदि होश में हैं, तो फलों का रस, ग्लूकोज का पानी या टॉफी दें।',
        textTe: 'స్పృహలో ఉంటే, పండ్ల రసం, గ్లూకోజ్ నీరు లేదా చాక్లెట్ ఇవ్వండి.',
        textTa: 'சுயநினைவுடன் இருந்தால், பழச்சாறு, குளுக்கோஸ் தண்ணீர் அல்லது மிட்டாய் கொடுக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Wait 15 minutes. If no improvement, seek medical help.',
        textKn: '15 ನಿಮಿಷ ಕಾಯಿರಿ. ಚೇತರಿಕೆ ಕಾಣದಿದ್ದರೆ ದ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: '15 मिनट प्रतीक्षा करें। यदि सुधार न हो, तो डॉक्टर की मदद लें।',
        textTe: '15 నిమిషాలు వేచి చూడండి. మెరుగుదల లేకపోతే డాక్టరును సంప్రదించండి.',
        textTa: '15 நிமிடங்கள் காத்திருங்கள். முன்னேற்றம் இல்லையென்றால், மருத்துவ உதவியை நாடவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'drowning',
    titleEn: 'Drowning',
    titleKn: 'ನೀರಿನಲ್ಲಿ ಮುಳುಗುವುದು',
    titleHi: 'पानी में डूबना',
    titleTe: 'నీటిలో మునిగిపోవడం',
    titleTa: 'நீரில் மூழ்குதல்',
    icon: 'Waves',
    color: 'bg-blue-600',
    steps: [
      {
        textEn: 'Remove from water safely. Check breathing.',
        textKn: 'ಸುರಕ್ಷಿತವಾಗಿ ನೀರಿನಿಂದ ಹೊರತೆಗೆಯಿರಿ. ಉಸಿರಾಟ ಪರೀಕ್ಷಿಸಿ.',
        textHi: 'सुरक्षित रूप से पानी से बाहर निकालें। सांस की जांच करें।',
        textTe: 'నీటి నుండి సురక్షితంగా బయటకు తీయండి. శ్వాసను తనిఖీ చేయండి.',
        textTa: 'பாதுகாப்பாக நீரிலிருந்து வெளியே எடுங்கள். சுவாசத்தைச் சோதிக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Start CPR if not breathing. Keep the person warm.',
        textKn: 'ಉಸಿರಾಟವಿಲ್ಲದಿದ್ದರೆ ಸಿಪಿಆರ್ ಪ್ರಾರಂಭಿಸಿ. ವ್ಯಕ್ತಿಯನ್ನು ಬೆಚ್ಚಗೆ ಇರಿಸಿ.',
        textHi: 'सांस न लेने पर सीपीआर शुरू करें। व्यक्ति को गर्म रखें।',
        textTe: 'శ్వాస లేకపోతే సిపిఆర్ చేయండి. వారిని వెచ్చగా ఉంచండి.',
        textTa: 'சுவாசம் இல்லை என்றால் சிபிஆர் தொடங்கவும். நபரை இதமான வெப்பத்தில் வைக்கவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'dogbite',
    titleEn: 'Dog Bite',
    titleKn: 'ನಾಯಿ ಕಡಿತ',
    titleHi: 'कुत्ते का काटना',
    titleTe: 'కుక్క కాటు',
    titleTa: 'நாய் கடி',
    icon: 'Bug',
    color: 'bg-orange-800',
    steps: [
      {
        textEn: 'Wash the wound within 15 mins with soap and running water.',
        textKn: '15 ನಿಮಿಷದ ಒಳಗೆ ಗಾಯವನ್ನು ಸೋಪು ಮತ್ತು ಹರಿಯುವ ನೀರಿನಿಂದ ತೊಳೆಯಿರಿ.',
        textHi: '15 मिनट के भीतर घाव को साबुन और बहते पानी से धोएं।',
        textTe: '15 నిమిషాల లోపు గాయాన్ని సోపు మరియు ప్రవహించే నీటితో కడగండి.',
        textTa: '15 நிமிடங்களுக்குள் காயத்தைச் சோப்பு மற்றும் ஓடும் நீரினால் கழுவவும்.',
        type: 'do'
      },
      {
        textEn: 'Consult a doctor immediately for Anti-Rabies Vaccine (ARV).',
        textKn: 'ರೇಬೀಸ್ ಲಸಿಕೆಗಾಗಿ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
        textHi: 'एंटी-रेबीज वैक्सीन के लिए तुरंत डॉक्टर से संपर्क करें।',
        textTe: 'రేబిస్ వ్యాక్సిన్ కోసం వెంటనే డాక్టరును సంప్రదించండి.',
        textTa: 'ரேபிஸ் தடுப்பூசிக்காக உடனடியாக மருத்துவரை அணுகவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'heatstroke',
    titleEn: 'Heat Stroke',
    titleKn: 'ಬಿಸಿಲ ಹೊಡೆತ',
    titleHi: 'लू लगना',
    titleTe: 'వడదెబ్బ',
    titleTa: 'வெப்பத்தாக்கம்',
    icon: 'Sun',
    color: 'bg-yellow-600',
    steps: [
      {
        textEn: 'Move to a cool, shady area. Cool body with damp cloth/fan.',
        textKn: 'ತಂಪಾದ ನೆರಳಿನ ಜಾಗಕ್ಕೆ ಕರೆದೊಯ್ಯಿರಿ. ಒದ್ದೆ ಬಟ್ಟೆ ಅಥವಾ ಫ್ಯಾನ್ ಬಳಸಿ ತಂಪು ಮಾಡಿ.',
        textHi: 'ठंडी, छायादार जगह पर ले जाएं। गीले कपड़े या पंखे से शरीर ठंडा करें।',
        textTe: 'చల్లని ప్రదేశానికి తరలించండి. తడి గుడ్డ లేదా ఫ్యాన్ తో శరీరాన్ని చల్లబరచండి.',
        textTa: 'குளிர்ந்த, நிழலான இடத்திற்கு அழைத்துச் செல்லுங்கள். ஈரமான துணி அல்லது விசிறி மூலம் உடலைக் குளிர்விக்கவும்.',
        type: 'do'
      },
      {
        textEn: 'Seek help if they have confused speech or high fever.',
        textKn: 'ತೊದಲುವ ಮಾತು ಅಥವಾ ಹೆಚ್ಚಿನ ಜ್ವರವಿದ್ದರೆ ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: 'यदि बोलने में भ्रम हो या तेज बुखार हो तो मदद लें।',
        textTe: 'మాటలు తడబడినా లేదా తీవ్రమైన జ్వరం ఉన్నా సహాయం కోరండి.',
        textTa: 'பேச்சு குழறல் அல்லது அதிக காய்ச்சல் இருந்தால் உதவி நாடவும்.',
        type: 'info'
      }
    ]
  },
  {
    id: 'hypothermia',
    titleEn: 'Hypothermia',
    titleKn: 'ತೀವ್ರ ಚಳಿ',
    titleHi: 'हाइपोथर्मिया (ठंड लगना)',
    titleTe: 'అల్ప ఉష్ణోగ్రత',
    titleTa: 'குறைந்த உடல்வெப்பநிலை',
    icon: 'CloudSnow',
    color: 'bg-sky-500',
    steps: [
      {
        textEn: 'Move to a warm area. Remove wet clothing and wrap in blankets.',
        textKn: 'ಬೆಚ್ಚಗಿನ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ. ಒದ್ದೆ ಬಟ್ಟೆ ತೆಗೆದು ಹೊದಿಕೆಯಿಂದ ಸುತ್ತಿ.',
        textHi: 'गर्म स्थान पर ले जाएं। गीले कपड़े उतारकर कंबल में लपेटें।',
        textTe: 'వెచ్చని ప్రదేశానికి తరలించండి. తడి బట్టలు తీసివేసి దుప్పట్లతో కప్పండి.',
        textTa: 'வெப்பமான இடத்திற்கு அழைத்துச் செல்லுங்கள். ஈரமான ஆடைகளை அகற்றிப் போர்வைகளால் போர்த்தவும்.',
        type: 'do'
      },
      {
        textEn: 'Offer warm drinks (non-alcoholic). Seek medical help if shivering stops.',
        textKn: 'ಬೆಚ್ಚಗಿನ ಪಾನೀಯ ನೀಡಿ. ನಡುಕ ನಿಂತರೆ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
        textHi: 'गर्म पेय पदार्थ दें। यदि कंपकंपी बंद हो जाए तो डॉक्टर की सलाह लें।',
        textTe: 'వెచ్చని పానీయాలు తాగించండి. వణుకు ఆగిపోతే డాక్టరును సంప్రదించండి.',
        textTa: 'சுடுநீரில் இதமான பானங்களை வழங்கவும். நடுக்கம் நின்றால் மருத்துவ உதவியை நாடவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'headinjury',
    titleEn: 'Head Injury',
    titleKn: 'ತಲೆಗೆ ಏಟು',
    titleHi: 'सिर की चोट',
    titleTe: 'తల గాయం',
    titleTa: 'தலைக் காயம்',
    icon: 'Activity',
    color: 'bg-slate-700',
    steps: [
      {
        textEn: 'Keep person still. Do not move them if spine injury is suspected.',
        textKn: 'ವ್ಯಕ್ತಿಯನ್ನು ಅಲ್ಲಾಡಿಸಬೇಡಿ. ಬೆನ್ನುಮೂಳೆಯ ಗಾಯದ ಶಂಕೆಯಿದ್ದರೆ ಕದಲಿಸಬೇಡಿ.',
        textHi: 'व्यक्ति को स्थिर रखें। यदि रीढ़ की चोट का संदेह हो तो उन्हें न हिलाएं।',
        textTe: 'వ్యక్తిని కదలకుండా ఉంచండి. వెన్నెముక గాయం అనిపిస్తే అసలు కదపవద్దు.',
        textTa: 'நபரை அசையாமல் வைக்கவும். முதுகெலும்பு பாதிப்பு இருந்தால் அசைக்க வேண்டாம்.',
        type: 'do'
      },
      {
        textEn: 'Check for vomiting, confusion, or severe bleeding.',
        textKn: 'ವಾಂತಿ, ಗೊಂದಲ ಅಥವಾ ತೀವ್ರ ರಕ್ತಸ್ರಾವವಿದೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ.',
        textHi: 'उल्टी, भ्रम या भारी रक्तस्राव की जांच करें।',
        textTe: 'వాంతులు, అయోమయం లేదా తీవ్ర రక్తస్రావం కోసం తనిఖీ చేయండి.',
        textTa: 'வாந்தி, குழப்பம் அல்லது கடுமையான இரத்தப்போக்கு இருக்கிறதா என்று பார்க்கவும்.',
        type: 'info'
      }
    ]
  },
  {
    id: 'asthma',
    titleEn: 'Asthma Attack',
    titleKn: 'ಆಸ್ತಮಾ',
    titleHi: 'अस्थमा का दौरा',
    titleTe: 'ఆస్తమా అటాక్',
    titleTa: 'ஆஸ்துமா பாதிப்பு',
    icon: 'Wind',
    color: 'bg-teal-600',
    steps: [
      {
        textEn: 'Help person sit upright. Stay calm and loosen tight clothing.',
        textKn: 'ನೇರವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ. ಶಾಂತವಾಗಿರಿ ಮತ್ತು ಬಿಗಿಯಾದ ಬಟ್ಟೆ ಸಡಿಲಗೊಳಿಸಿ.',
        textHi: 'सीधे बैठने में मदद करें। शांत रहें और तंग कपड़े ढीले करें।',
        textTe: 'నిటారుగా కూర్చోబెట్టండి. ప్రశాంతంగా ఉండి బిగుతైన దుస్తులను వదులు చేయండి.',
        textTa: 'நேராக அமர உதவவும். அமைதியாக இருந்து இறுக்கமான ஆடைகளைத் தளர்த்தவும்.',
        type: 'do'
      },
      {
        textEn: 'Use rescue inhaler (1-2 puffs). If no inhaler, call emergency.',
        textKn: 'ಇನ್ಹೇಲರ್ ಬಳಸಿ (1-2 ಸಾರಿ). ಇನ್ಹೇಲರ್ ಇಲ್ಲದಿದ್ದರೆ ತುರ್ತು ಕರೆ ಮಾಡಿ.',
        textHi: 'रेस्क्यू इनहेलर का प्रयोग करें। यदि उपलब्ध न हो, तो मदद लें।',
        textTe: 'ఇన్హేలర్ ఉంటే 1-2 సార్లు వాడండి. లేకపోతే వెంటనే సహాయం కోరండి.',
        textTa: 'இன்ஹேலரைப் பயன்படுத்தவும். இல்லையென்றால் அவசர உதவியை நாடவும்.',
        type: 'do'
      }
    ]
  },
  {
    id: 'fainting',
    titleEn: 'Fainting',
    titleKn: 'ಪ್ರಜ್ಞೆ ತಪ್ಪುವುದು',
    titleHi: 'बेहोश होना',
    titleTe: 'స్పృహ కోల్పోవడం',
    titleTa: 'மயக்கம்',
    icon: 'EyeOff',
    color: 'bg-stone-500',
    steps: [
      {
        textEn: 'Lay person on their back. Elevate legs 12 inches.',
        textKn: 'ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿಸಿ. ಕಾಲುಗಳನ್ನು 12 ಇಂಚು ಮೇಲೆ ಇರಿಸಿ.',
        textHi: 'पीठ के बल लिटाएं। पैरों को 12 इंच ऊपर उठाएं।',
        textTe: 'వెల్లకిలా పడుకోబెట్టండి. కాళ్ళను కొంచెం పైకి ఎత్తండి.',
        textTa: 'மல்லாக்கப் படுக்க வைக்கவும். கால்களை ஒரு அடி உயர்த்தவும்.',
        type: 'do'
      },
      {
        textEn: 'Check for breathing. Ensure fresh air and loosen tight clothes.',
        textKn: 'ಉಸಿರಾಟ ಪರೀಕ್ಷಿಸಿ. ತಾಜಾ ಗಾಳಿ ಸಿಗುವಂತೆ ಮಾಡಿ ಮತ್ತು ಬಟ್ಟೆ ಸಡಿಲಗೊಳಿಸಿ.',
        textHi: 'सांस की जांच करें। ताजी हवा आने दें और कपड़े ढीले करें।',
        textTe: 'శ్వాసను తనిఖీ చేయండి. గాలి తగిలేలా చూడండి మరియు బట్టలు వదులు చేయండి.',
        textTa: 'சுவாசத்தைச் சோதிக்கவும். காற்று கிடைப்பதை உறுதி செய்து ஆடைகளைத் தளர்த்தவும்.',
        type: 'do'
      }
    ]
  }
];

export const hospitals: Hospital[] = [
  // Bengaluru Core
  { name: 'Victoria Hospital', distance: '0.5 km', phone: '080-26701150', city: 'Bengaluru', area: 'KR Market', lat: 12.9647, lng: 77.5767, specialties: ['General', 'Surgery', 'Trauma'], rating: 4.2 },
  { name: 'Bowring and Lady Curzon Hospital', distance: '1.2 km', phone: '080-25591325', city: 'Bengaluru', area: 'Shivajinagar', lat: 12.9837, lng: 77.6010, specialties: ['General', 'Pediatrics'], rating: 4.0 },
  { name: 'St. John\'s Medical College Hospital', distance: '3.5 km', phone: '080-22065000', city: 'Bengaluru', area: 'Silk Board', lat: 12.9341, lng: 77.6127, specialties: ['Multi-specialty', 'Cardiology', 'Neurology'], rating: 4.6 },
  { name: 'NIMHANS Casualty', distance: '4.2 km', phone: '080-26995000', city: 'Bengaluru', area: 'Lakkasandra', lat: 12.9430, lng: 77.5910, specialties: ['Neurology', 'Psychiatry'], rating: 4.8 },
  { name: 'Manipal Hospital (Old Airport Road)', distance: '5.8 km', phone: '080-25024444', city: 'Bengaluru', area: 'Old Airport Road', lat: 12.9592, lng: 77.6444, specialties: ['Multi-specialty', 'Cardiology', 'Oncology'], rating: 4.7 },
  { name: 'Sagar Hospitals (Jayanagar)', distance: '6.1 km', phone: '080-42888888', city: 'Bengaluru', area: 'Jayanagar', lat: 12.9234, lng: 77.5940, specialties: ['Orthopedics', 'Cardiology'], rating: 4.5 },
  { name: 'Fortis Hospital (Bannerghatta Road)', distance: '8.4 km', phone: '080-66214444', city: 'Bengaluru', area: 'Bannerghatta Road', lat: 12.8943, lng: 77.5986, specialties: ['Cardiology', 'Neurology', 'Orthopedics'], rating: 4.4 },
  { name: 'Aster CMI Hospital', distance: '9.5 km', phone: '080-43420100', city: 'Bengaluru', area: 'Hebbal', lat: 13.0610, lng: 77.5930, specialties: ['Multi-specialty', 'Neurology', 'Gastroenterology'], rating: 4.5 },
  { name: 'Sakra World Hospital', distance: '10.2 km', phone: '080-49694969', city: 'Bengaluru', area: 'Bellandur', lat: 12.9280, lng: 77.6950, specialties: ['Orthopedics', 'Neurology', 'Rehabilitation'], rating: 4.4 },
  { name: 'BGS Gleneagles Global Hospital', distance: '11.5 km', phone: '080-26255555', city: 'Bengaluru', area: 'Kengeri', lat: 12.9060, lng: 77.4950, specialties: ['Organ-Transplant', 'Gastroenterology', 'Hepatology'], rating: 4.3 },
  { name: 'Columbia Asia Referral Hospital Yeahshwanthpur', distance: '7.8 km', phone: '080-39898969', city: 'Bengaluru', area: 'Yeshwanthpur', lat: 13.0120, lng: 77.5550, specialties: ['Multi-specialty', 'Emergency'], rating: 4.4 },

  // User Provided: nearby_centers
  { name: "Apollo Hospitals Bannerghatta", distance: "Nearby", phone: "08026304050", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.8954, lng: 77.5982, specialties: ["Private Multi Speciality", "Ambulance: 1066"], rating: 4.5 },
  { name: "Fortis Hospital Bannerghatta Road", distance: "Nearby", phone: "08066214444", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.8940, lng: 77.5980, specialties: ["Private Multi Speciality", "Ambulance: 105010"], rating: 4.4 },
  { name: "Sri Sairam Hospital", distance: "Nearby", phone: "08042173333", city: "Bengaluru", area: "Hulimavu", lat: 12.8797, lng: 77.6048, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Vijayashree Hospital", distance: "Nearby", phone: "08026634617", city: "Bengaluru", area: "Gottigere", lat: 12.8561, lng: 77.5878, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Medax Hospital", distance: "Nearby", phone: "08027863456", city: "Bengaluru", area: "Gottigere", lat: 12.8570, lng: 77.5885, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Mathru Hospital", distance: "Nearby", phone: "08026482600", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.8900, lng: 77.5990, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Camry Hospital", distance: "Nearby", phone: "08025740033", city: "Bengaluru", area: "Jigani", lat: 12.7845, lng: 77.6321, specialties: ["Private Multi Speciality", "Ambulance: 108"], rating: 4.0 },
  { name: "Ekana Hospital", distance: "Nearby", phone: "08027826789", city: "Bengaluru", area: "Jigani", lat: 12.7850, lng: 77.6330, specialties: ["Private Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "Athreya Hospital", distance: "Nearby", phone: "08027822211", city: "Bengaluru", area: "Anekal", lat: 12.7076, lng: 77.6974, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Aditi Hospital", distance: "Nearby", phone: "08027831000", city: "Bengaluru", area: "Anekal", lat: 12.7080, lng: 77.6980, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "General Hospital Anekal", distance: "Nearby", phone: "08027823456", city: "Bengaluru", area: "Anekal", lat: 12.7100, lng: 77.7000, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.8 },
  { name: "Primary Health Centre Jigani", distance: "Nearby", phone: "08027825544", city: "Bengaluru", area: "Jigani", lat: 12.7870, lng: 77.6350, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },
  { name: "Government Hospital Bannerghatta", distance: "Nearby", phone: "08029784512", city: "Bengaluru", area: "Bannerghatta", lat: 12.8062, lng: 77.5786, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.6 },
  { name: "Government Primary Health Center Gottigere", distance: "Nearby", phone: "08026588741", city: "Bengaluru", area: "Gottigere", lat: 12.8580, lng: 77.5890, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },
  { name: "Sri Krishna Hospital", distance: "Nearby", phone: "08026681234", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9000, lng: 77.6000, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Banashankari Hospital", distance: "Nearby", phone: "08026791211", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9100, lng: 77.6100, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Lifecare Hospital", distance: "Nearby", phone: "08042112233", city: "Bengaluru", area: "Hulimavu", lat: 12.8850, lng: 77.6050, specialties: ["Private Clinic", "Ambulance: 108"], rating: 4.0 },
  { name: "Sunrise Hospital", distance: "Nearby", phone: "08042145566", city: "Bengaluru", area: "Gottigere", lat: 12.8600, lng: 77.5900, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "People Tree Clinic", distance: "Nearby", phone: "08027885522", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9200, lng: 77.6150, specialties: ["Private Clinic", "Ambulance: 108"], rating: 4.2 },
  { name: "Janani Hospital", distance: "Nearby", phone: "08027834455", city: "Bengaluru", area: "Anekal", lat: 12.7150, lng: 77.7050, specialties: ["Maternity Hospital", "Ambulance: 102"], rating: 4.0 },
  { name: "Motherhood Clinic", distance: "Nearby", phone: "08042002211", city: "Bengaluru", area: "Hulimavu", lat: 12.8900, lng: 77.6100, specialties: ["Women and Child Care", "Ambulance: 102"], rating: 4.3 },
  { name: "ESI Hospital Jigani", distance: "Nearby", phone: "08027828888", city: "Bengaluru", area: "Jigani", lat: 12.7900, lng: 77.6400, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "Urban Primary Health Centre", distance: "Nearby", phone: "08026591234", city: "Bengaluru", area: "Hulimavu", lat: 12.8950, lng: 77.6150, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },
  { name: "Sparsh Hospital", distance: "Nearby", phone: "08061222000", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9250, lng: 77.6200, specialties: ["Speciality Hospital", "Ambulance: 108"], rating: 4.5 },
  { name: "Nano Hospitals", distance: "Nearby", phone: "08026784567", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9300, lng: 77.6250, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },

  // User Provided: nearby_centers_extra
  { name: "Jayadeva Hospital", distance: "Nearby", phone: "08022977200", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9234, lng: 77.5940, specialties: ["Government Cardiac Hospital", "Ambulance: 108"], rating: 4.8 },
  { name: "Sri Lakshmi Hospital", distance: "Nearby", phone: "08042154422", city: "Bengaluru", area: "Hulimavu", lat: 12.8797, lng: 77.6048, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Raksha Hospital", distance: "Nearby", phone: "08026661122", city: "Bengaluru", area: "Gottigere", lat: 12.8561, lng: 77.5878, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Best Hospital", distance: "Nearby", phone: "08027890011", city: "Bengaluru", area: "Bannerghatta", lat: 12.8062, lng: 77.5786, specialties: ["Private Clinic", "Ambulance: 108"], rating: 3.9 },
  { name: "Sri Vinayaka Hospital", distance: "Nearby", phone: "08027825599", city: "Bengaluru", area: "Jigani", lat: 12.7845, lng: 77.6321, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Arogya Hospital", distance: "Nearby", phone: "08027831122", city: "Bengaluru", area: "Anekal", lat: 12.7076, lng: 77.6974, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Government Hospital Jigani", distance: "Nearby", phone: "08027826677", city: "Bengaluru", area: "Jigani", lat: 12.7870, lng: 77.6350, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },
  { name: "Government PHC Hulimavu", distance: "Nearby", phone: "08026598811", city: "Bengaluru", area: "Hulimavu", lat: 12.8820, lng: 77.6100, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.8 },
  { name: "Anekal Taluk Hospital", distance: "Nearby", phone: "08027823344", city: "Bengaluru", area: "Anekal", lat: 12.7120, lng: 77.7020, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "Bannerghatta Primary Health Centre", distance: "Nearby", phone: "08029783311", city: "Bengaluru", area: "Bannerghatta", lat: 12.8100, lng: 77.5850, specialties: ["Government Health Centre", "Ambulance: 108"], rating: 3.7 },
  { name: "Life Line Hospital", distance: "Nearby", phone: "08026574455", city: "Bengaluru", area: "Gottigere", lat: 12.8620, lng: 77.5950, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Sujatha Hospital", distance: "Nearby", phone: "08026645522", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9350, lng: 77.6300, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Greenview Medical Center", distance: "Nearby", phone: "08042117788", city: "Bengaluru", area: "Hulimavu", lat: 12.9000, lng: 77.6200, specialties: ["Private Clinic", "Ambulance: 108"], rating: 4.2 },
  { name: "Shanthi Hospital", distance: "Nearby", phone: "08027827711", city: "Bengaluru", area: "Jigani", lat: 12.7950, lng: 77.6450, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Sri Sai Multi Speciality Hospital", distance: "Nearby", phone: "08029782255", city: "Bengaluru", area: "Bannerghatta", lat: 12.8150, lng: 77.5900, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Ashraya Hospital", distance: "Nearby", phone: "08027834499", city: "Bengaluru", area: "Anekal", lat: 12.7200, lng: 77.7100, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Health Plus Clinic", distance: "Nearby", phone: "08026575566", city: "Bengaluru", area: "Gottigere", lat: 12.8650, lng: 77.6000, specialties: ["Private Clinic", "Ambulance: 108"], rating: 4.2 },
  { name: "People Care Hospital", distance: "Nearby", phone: "08026689911", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9400, lng: 77.6350, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Community Health Center", distance: "Nearby", phone: "08027837722", city: "Bengaluru", area: "Anekal", lat: 12.7250, lng: 77.7150, specialties: ["Government Health Centre", "Ambulance: 108"], rating: 3.8 },
  { name: "Narayana Clinic", distance: "Nearby", phone: "08042156677", city: "Bengaluru", area: "Hulimavu", lat: 12.9050, lng: 77.6250, specialties: ["Private Clinic", "Ambulance: 108"], rating: 4.3 },
  { name: "Sankalp Hospital", distance: "Nearby", phone: "08029781100", city: "Bengaluru", area: "Bannerghatta", lat: 12.8200, lng: 77.5950, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Jigani Rural Hospital", distance: "Nearby", phone: "08027829900", city: "Bengaluru", area: "Jigani", lat: 12.8000, lng: 77.6500, specialties: ["Government Rural Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "Family Care Hospital", distance: "Nearby", phone: "08026570044", city: "Bengaluru", area: "Gottigere", lat: 12.8700, lng: 77.6050, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Emergency Care Centre", distance: "Nearby", phone: "08026678800", city: "Bengaluru", area: "Bannerghatta Road", lat: 12.9450, lng: 77.6400, specialties: ["Emergency Trauma Center", "Ambulance: 108"], rating: 4.6 },
  { name: "Hope Medical Center", distance: "Nearby", phone: "08027835588", city: "Bengaluru", area: "Anekal", lat: 12.7300, lng: 77.7200, specialties: ["Private Medical Center", "Ambulance: 108"], rating: 4.2 },

  // User Provided: bangalore_hospitals
  { name: "Narayana Health City", distance: "Nearby", phone: "08071222222", city: "Bengaluru", area: "Bommasandra", lat: 12.8250, lng: 77.6930, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.6 },
  { name: "Mazumdar Shaw Medical Center", distance: "Nearby", phone: "08071222000", city: "Bengaluru", area: "Bommasandra", lat: 12.8260, lng: 77.6940, specialties: ["Cancer and Multi Speciality Hospital", "Ambulance: 108"], rating: 4.7 },
  { name: "Sparsh Hospital Bommasandra", distance: "Nearby", phone: "08061222000", city: "Bengaluru", area: "Bommasandra", lat: 12.8270, lng: 77.6950, specialties: ["Speciality Hospital", "Ambulance: 108"], rating: 4.5 },
  { name: "Vimalalaya Hospital", distance: "Nearby", phone: "08028521111", city: "Bengaluru", area: "Electronic City", lat: 12.8452, lng: 77.6748, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Cloudnine Hospital Electronic City", distance: "Nearby", phone: "08044671111", city: "Bengaluru", area: "Electronic City", lat: 12.8460, lng: 77.6750, specialties: ["Women and Child Care", "Ambulance: 102"], rating: 4.6 },
  { name: "Springleaf Hospital", distance: "Nearby", phone: "08047188888", city: "Bengaluru", area: "Electronic City", lat: 12.8470, lng: 77.6760, specialties: ["Private Multi Speciality", "Ambulance: 108"], rating: 4.4 },
  { name: "Jayadeva Institute of Cardiovascular Sciences", distance: "Nearby", phone: "08022977200", city: "Bengaluru", area: "Jayadeva", lat: 12.9234, lng: 77.5940, specialties: ["Government Cardiac Hospital", "Ambulance: 108"], rating: 4.8 },
  { name: "Apollo Hospital Jayanagar", distance: "Nearby", phone: "08026304050", city: "Bengaluru", area: "Jayanagar", lat: 12.9240, lng: 77.5950, specialties: ["Multi Speciality Hospital", "Ambulance: 1066"], rating: 4.5 },
  { name: "Sagar Hospitals Jayanagar", distance: "Nearby", phone: "08042999999", city: "Bengaluru", area: "Jayanagar", lat: 12.9250, lng: 77.5960, specialties: ["Private Multi Speciality", "Ambulance: 108"], rating: 4.5 },
  { name: "Sri Jayadeva Hospital Jayanagar", distance: "Nearby", phone: "08022977200", city: "Bengaluru", area: "Jayanagar", lat: 12.9260, lng: 77.5970, specialties: ["Government Hospital", "Ambulance: 108"], rating: 4.7 },
  { name: "Greenview Medical Center JP Nagar", distance: "Nearby", phone: "08026588222", city: "Bengaluru", area: "JP Nagar", lat: 12.9100, lng: 77.5850, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Rajshekar Hospital", distance: "Nearby", phone: "08022422222", city: "Bengaluru", area: "JP Nagar", lat: 12.9150, lng: 77.5900, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Aster RV Hospital", distance: "Nearby", phone: "08066040400", city: "Bengaluru", area: "JP Nagar", lat: 12.9200, lng: 77.5950, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.6 },
  { name: "Manipal Hospital HSR", distance: "Nearby", phone: "08022221111", city: "Bengaluru", area: "HSR Layout", lat: 12.9100, lng: 77.6400, specialties: ["Private Multi Speciality", "Ambulance: 108"], rating: 4.5 },
  { name: "Narayana Multispeciality Clinic HSR", distance: "Nearby", phone: "08043322222", city: "Bengaluru", area: "HSR Layout", lat: 12.9150, lng: 77.6450, specialties: ["Clinic", "Ambulance: 108"], rating: 4.4 },
  { name: "Greenview Hospital HSR", distance: "Nearby", phone: "08025634567", city: "Bengaluru", area: "HSR Layout", lat: 12.9200, lng: 77.6500, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Apollo Clinic BTM", distance: "Nearby", phone: "08022556677", city: "Bengaluru", area: "BTM Layout", lat: 12.9165, lng: 77.6101, specialties: ["Clinic", "Ambulance: 108"], rating: 4.2 },
  { name: "Marigold Hospital", distance: "Nearby", phone: "08026781122", city: "Bengaluru", area: "BTM Layout", lat: 12.9180, lng: 77.6120, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Life Care Hospital BTM", distance: "Nearby", phone: "08026667788", city: "Bengaluru", area: "BTM Layout", lat: 12.9200, lng: 77.6150, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Fortis Hospital Banashankari", distance: "Nearby", phone: "08066214444", city: "Bengaluru", area: "Banashankari", lat: 12.9254, lng: 77.5468, specialties: ["Multi Speciality Hospital", "Ambulance: 105010"], rating: 4.4 },
  { name: "People Tree Hospitals Banashankari", distance: "Nearby", phone: "08049599999", city: "Bengaluru", area: "Banashankari", lat: 12.9300, lng: 77.5500, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Devagiri Hospital", distance: "Nearby", phone: "08026790011", city: "Bengaluru", area: "Banashankari", lat: 12.9350, lng: 77.5550, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "BGS Global Hospital Kengeri", distance: "Nearby", phone: "08026255555", city: "Bengaluru", area: "Kengeri", lat: 12.9175, lng: 77.4837, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "Kengeri Government Hospital", distance: "Nearby", phone: "08028484211", city: "Bengaluru", area: "Kengeri", lat: 12.9200, lng: 77.4850, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },
  { name: "Rajarajeshwari Medical Hospital", distance: "Nearby", phone: "08028437124", city: "Bengaluru", area: "Kengeri", lat: 12.9250, lng: 77.4900, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Chord Road Hospital", distance: "Nearby", phone: "08023111122", city: "Bengaluru", area: "Vijayanagar", lat: 12.9719, lng: 77.5303, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Vijayanagar Global Hospital", distance: "Nearby", phone: "08023335566", city: "Bengaluru", area: "Vijayanagar", lat: 12.9750, lng: 77.5350, specialties: ["Private Multi Speciality", "Ambulance: 108"], rating: 4.3 },
  { name: "Government Hospital Vijayanagar", distance: "Nearby", phone: "08023301122", city: "Bengaluru", area: "Vijayanagar", lat: 12.9800, lng: 77.5400, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.8 },
  { name: "St. John's Medical College Hospital Silk Board", distance: "Nearby", phone: "08022065000", city: "Bengaluru", area: "Silk Board", lat: 12.9176, lng: 77.6233, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 4.6 },
  { name: "Jayashree Multi Speciality Hospital", distance: "Nearby", phone: "08025556644", city: "Bengaluru", area: "Silk Board", lat: 12.9200, lng: 77.6250, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Sri Lakshmi Hospital Silk Board", distance: "Nearby", phone: "08026778899", city: "Bengaluru", area: "Silk Board", lat: 12.9250, lng: 77.6300, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },

  // User Provided: bangalore_hospitals_extra
  { name: "Aster CMI Hospital Hebbal", distance: "Nearby", phone: "08043420100", city: "Bengaluru", area: "Hebbal", lat: 13.0620, lng: 77.5930, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.5 },
  { name: "Bangalore Baptist Hospital", distance: "Nearby", phone: "08022024700", city: "Bengaluru", area: "Hebbal", lat: 13.0354, lng: 77.5988, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "Columbia Asia Hospital Hebbal", distance: "Nearby", phone: "08061656666", city: "Bengaluru", area: "Hebbal", lat: 13.0400, lng: 77.6000, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "MS Ramaiah Memorial Hospital", distance: "Nearby", phone: "08023608888", city: "Bengaluru", area: "Mathikere", lat: 13.0300, lng: 77.5650, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 4.6 },
  { name: "People Tree Hospital Yeshwanthpur", distance: "Nearby", phone: "08049599999", city: "Bengaluru", area: "Yeshwanthpur", lat: 13.0150, lng: 77.5500, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "ESI Hospital Rajajinagar", distance: "Nearby", phone: "08023014444", city: "Bengaluru", area: "Rajajinagar", lat: 12.9904, lng: 77.5539, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "KC General Hospital", distance: "Nearby", phone: "08023341771", city: "Bengaluru", area: "Malleshwaram", lat: 13.0033, lng: 77.5694, specialties: ["Government Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Manipal Hospital Malleshwaram", distance: "Nearby", phone: "08022221111", city: "Bengaluru", area: "Malleshwaram", lat: 13.0050, lng: 77.5700, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "Bowring and Lady Curzon Hospital Shivajinagar", distance: "Nearby", phone: "08025591362", city: "Bengaluru", area: "Shivajinagar", lat: 12.9857, lng: 77.6057, specialties: ["Government Hospital", "Ambulance: 108"], rating: 4.0 },
  { name: "Hosmat Hospital", distance: "Nearby", phone: "08025593796", city: "Bengaluru", area: "Magrath Road", lat: 12.9701, lng: 77.6086, specialties: ["Orthopedic Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Mallya Hospital", distance: "Nearby", phone: "08022277979", city: "Bengaluru", area: "Richmond Road", lat: 12.9669, lng: 77.6044, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Victoria Hospital KR Market", distance: "Nearby", phone: "08026701150", city: "Bengaluru", area: "KR Market", lat: 12.9647, lng: 77.5767, specialties: ["Government Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Vani Vilas Hospital", distance: "Nearby", phone: "08026701700", city: "Bengaluru", area: "KR Market", lat: 12.9650, lng: 77.5770, specialties: ["Government Women and Child Hospital", "Ambulance: 102"], rating: 4.1 },
  { name: "Kempegowda Institute of Medical Sciences Hospital", distance: "Nearby", phone: "08026613225", city: "Bengaluru", area: "VV Puram", lat: 12.9497, lng: 77.5750, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Sanjay Gandhi Hospital", distance: "Nearby", phone: "08026941953", city: "Bengaluru", area: "Jayanagar", lat: 12.9300, lng: 77.5900, specialties: ["Government Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Deepak Hospital", distance: "Nearby", phone: "08022421111", city: "Bengaluru", area: "Jayanagar", lat: 12.9350, lng: 77.5950, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Cloudnine Hospital Jayanagar", distance: "Nearby", phone: "08044671111", city: "Bengaluru", area: "Jayanagar", lat: 12.9400, lng: 77.6000, specialties: ["Women and Child Care", "Ambulance: 102"], rating: 4.7 },
  { name: "Manipal Hospital Old Airport Road", distance: "Nearby", phone: "08025024444", city: "Bengaluru", area: "Old Airport Road", lat: 12.9592, lng: 77.6444, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.7 },
  { name: "Command Hospital Air Force", distance: "Nearby", phone: "08025229888", city: "Bengaluru", area: "Old Airport Road", lat: 12.9650, lng: 77.6500, specialties: ["Military Hospital", "Ambulance: 108"], rating: 4.8 },
  { name: "Rainbow Children's Hospital", distance: "Nearby", phone: "08042412345", city: "Bengaluru", area: "Marathahalli", lat: 12.9562, lng: 77.7011, specialties: ["Children Hospital", "Ambulance: 102"], rating: 4.5 },
  { name: "Sakra World Hospital Bellandur", distance: "Nearby", phone: "08049694969", city: "Bengaluru", area: "Bellandur", lat: 12.9304, lng: 77.6784, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.4 },
  { name: "Cloudnine Hospital Bellandur", distance: "Nearby", phone: "08044671111", city: "Bengaluru", area: "Bellandur", lat: 12.9350, lng: 77.6800, specialties: ["Women and Child Care", "Ambulance: 102"], rating: 4.6 },
  { name: "Brookefield Hospital", distance: "Nearby", phone: "08042445555", city: "Bengaluru", area: "Brookefield", lat: 12.9647, lng: 77.7180, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.2 },
  { name: "Vydehi Hospital", distance: "Nearby", phone: "08049069000", city: "Bengaluru", area: "Whitefield", lat: 12.9750, lng: 77.7500, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 4.3 },
  { name: "Manipal Hospital Whitefield", distance: "Nearby", phone: "08025024444", city: "Bengaluru", area: "Whitefield", lat: 12.9800, lng: 77.7550, specialties: ["Multi Speciality Hospital", "Ambulance: 108"], rating: 4.5 },
  { name: "Sri Sathya Sai Hospital Whitefield", distance: "Nearby", phone: "08047104600", city: "Bengaluru", area: "Whitefield", lat: 12.9850, lng: 77.7600, specialties: ["Free Super Speciality Hospital", "Ambulance: 108"], rating: 4.9 },
  { name: "MVJ Medical College Hospital", distance: "Nearby", phone: "08027931473", city: "Bengaluru", area: "Hoskote", lat: 13.0697, lng: 77.7982, specialties: ["Teaching Hospital", "Ambulance: 108"], rating: 3.9 },
  { name: "Akash Hospital", distance: "Nearby", phone: "08027683838", city: "Bengaluru", area: "Devanahalli", lat: 13.2483, lng: 77.7126, specialties: ["Private Hospital", "Ambulance: 108"], rating: 4.1 },
  { name: "Government Hospital Devanahalli", distance: "Nearby", phone: "08027682244", city: "Bengaluru", area: "Devanahalli", lat: 13.2550, lng: 77.7200, specialties: ["Government Hospital", "Ambulance: 108"], rating: 3.7 },

  // Other Cities (from originals)
  { name: 'K.R. Hospital', distance: '1.0 km', phone: '0821-2421112', city: 'Mysuru', area: 'Central', lat: 12.3129, lng: 76.6500, specialties: ['General', 'Emergency'], rating: 4.1 },
  { name: 'JSS Hospital', distance: '2.4 km', phone: '0821-2335555', city: 'Mysuru', area: 'Ramanuja Road', lat: 12.2965, lng: 76.6568, specialties: ['Multi-specialty', 'Neurology'], rating: 4.5 },
  { name: 'Apollo BGS Hospitals', distance: '4.1 km', phone: '0821-2568888', city: 'Mysuru', area: 'Adichunchanagiri Road', lat: 12.3164, lng: 76.6212, specialties: ['Cardiology', 'Surgery'], rating: 4.6 },
  { name: 'Wenlock District Hospital', distance: '0.8 km', phone: '0824-2423300', city: 'Mangaluru', area: 'Hampankatta', lat: 12.8654, lng: 74.8427, specialties: ['General', 'Trauma'], rating: 3.8 },
  { name: 'KIMS Hospital Hubli', distance: '1.5 km', phone: '0836-2374624', city: 'Hubballi', area: 'Vidyanagar', lat: 15.3621, lng: 75.1234, specialties: ['General', 'Emergency'], rating: 3.9 },
  { name: 'KLES Dr. Prabhakar Kore Hospital', distance: '3.0 km', phone: '0831-2473777', city: 'Belagavi', area: 'Nehru Nagar', lat: 15.8671, lng: 74.5094, specialties: ['Multi-specialty', 'Cardiac-Surgery'], rating: 4.7 }
];

