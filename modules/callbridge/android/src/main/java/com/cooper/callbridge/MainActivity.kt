package com.cooper.callbridge

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import kotlin.math.log


class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }

    fun handleIntent(intent: Intent?){
        Log.d("INTENT", "Handling intent")
        if(intent?.action == Intent.ACTION_DIAL){
            val number = intent.data?.schemeSpecificPart
            CallManager.updateNumber(number)
        }
    }

    override fun getMainComponentName(): String {
        return "main"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate? {
        return super.createReactActivityDelegate()
    }
}