package com.mindmatrix.prathamchikitse

import android.os.Bundle
import android.speech.tts.TextToSpeech
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.mindmatrix.prathamchikitse.adapter.StepAdapter
import com.mindmatrix.prathamchikitse.databinding.ActivityDetailBinding
import java.util.*

/**
 * MainActivity demonstrating the core logic for the First-Aid app.
 * Using Kotlin as requested by the user.
 */
class MainActivity : AppCompatActivity(), TextToSpeech.OnInitListener {

    private lateinit var binding: ActivityDetailBinding
    private lateinit var tts: TextToSpeech
    private var isAudioEnabled = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize TTS
        tts = TextToSpeech(this, this)

        // Setup ViewPager2 for Step-by-Step Instructions
        val steps = getEmergencySteps() // Placeholder for data loading
        val adapter = StepAdapter(steps)
        binding.viewPager.adapter = adapter

        // Handle Audio Toggle
        binding.btnAudio.setOnClickListener {
            isAudioEnabled = !isAudioEnabled
            updateAudioIcon()
            if (isAudioEnabled) speakCurrentStep()
        }

        // Speak when page changes
        binding.viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                if (isAudioEnabled) speakCurrentStep()
            }
        })

        // Call button integration
        binding.btnCall.setOnClickListener {
            // Intent to dialer for 108
        }
    }

    private fun speakCurrentStep() {
        val currentStep = (binding.viewPager.adapter as StepAdapter).getStep(binding.viewPager.currentItem)
        tts.speak(currentStep.instructionKn, TextToSpeech.QUEUE_FLUSH, null, "step_id")
    }

    private fun updateAudioIcon() {
        if (isAudioEnabled) {
            binding.btnAudio.setImageResource(R.drawable.ic_volume_up)
        } else {
            binding.btnAudio.setImageResource(R.drawable.ic_volume_off)
        }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val result = tts.setLanguage(Locale("kn", "IN"))
            if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                // Handle language not supported
            }
        }
    }

    override fun onDestroy() {
        if (::tts.isInitialized) {
            tts.stop()
            tts.shutdown()
        }
        super.onDestroy()
    }

    private fun getEmergencySteps(): List<Step> {
        // Return mock data for demonstration
        return listOf(
            Step("Clean the wound", "ಗಾಯವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ", StepType.DO),
            Step("Apply pressure", "ಒತ್ತಡವನ್ನು ಅನ್ವಯಿಸಿ", StepType.DO),
            Step("Don't apply ice directly", "ಐಸ್ ಅನ್ನು ನೇರವಾಗಿ ಅನ್ವಯಿಸಬೇಡಿ", StepType.DONT)
        )
    }
}

data class Step(val instructionEn: String, val instructionKn: String, val type: StepType)
enum class StepType { DO, DONT, INFO }
