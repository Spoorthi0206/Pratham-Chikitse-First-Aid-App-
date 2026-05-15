package com.mindmatrix.prathamchikitse.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.mindmatrix.prathamchikitse.Step
import com.mindmatrix.prathamchikitse.databinding.ItemStepBinding

/**
 * Kotlin Adapter for Android ViewPager2 implementation
 */
class StepAdapter(private val steps: List<Step>) : RecyclerView.Adapter<StepAdapter.StepViewHolder>() {

    class StepViewHolder(val binding: ItemStepBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StepViewHolder {
        val binding = ItemStepBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return StepViewHolder(binding)
    }

    override fun onBindViewHolder(holder: StepViewHolder, position: Int) {
        val step = steps[position]
        holder.binding.textInstructionEn.text = step.instructionEn
        holder.binding.textInstructionKn.text = step.instructionKn
        
        // Handle icon/color logic based on StepType in native Kotlin
    }

    override fun getItemCount(): Int = steps.size

    fun getStep(position: Int): Step = steps[position]
}
