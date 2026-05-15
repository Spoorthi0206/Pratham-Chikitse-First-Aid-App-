package com.mindmatrix.prathamchikitse.model

/**
 * Kotlin data model for Emergency Situations
 */
data class EmergencyData(
    val id: String,
    val titleEn: String,
    val titleKn: String,
    val icon: String,
    val color: String,
    val steps: List<EmergencyStep>
)

data class EmergencyStep(
    val textEn: String,
    val textKn: String,
    val type: StepType
)

enum class StepType {
    DO, DONT, INFO
}

/**
 * Example repository for provide emergency data to the ViewPager2
 */
object EmergencyRepository {
    fun getEmergencies(): List<EmergencyData> {
        return listOf(
            EmergencyData(
                id = "choking",
                titleEn = "Choking",
                titleKn = "ಗಂಟಲಲ್ಲಿ ಆಹಾರ ಸಿಕ್ಕಿಕೊಂಡರೆ",
                icon = "Wind",
                color = "#FF9800",
                steps = listOf(
                    EmergencyStep("Ask the person if they are choking.", "ವ್ಯಕ್ತಿಯನ್ನು ಉಸಿರುಗಟ್ಟಿದೆಯೇ ಎಂದು ಕೇಳಿ.", StepType.INFO),
                    EmergencyStep("Perform Heimlich Maneuver.", "ಹೈಮ್ಲಿಚ್ ಕುಶಲತೆಯನ್ನು ಮಾಡಿ.", StepType.DO)
                )
            )
            // ... all other situations can be mapped here similarly
        )
    }
}
