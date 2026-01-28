package com.cooper.phone

import android.app.role.RoleManager
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.cooper.phone.ui.theme.PhoneTheme

class MainActivity : ComponentActivity() {

    private val REQUEST_ID = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PhoneTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Log.d("padding", innerPadding.toString())
                    DialerScreen({
                        test()
                    })
                }
            }
        }

        requestRole()
    }

    fun test(){
        val intent = Intent(this, InCallUi::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT)
        }
        startActivity(intent)
    }

    fun requestRole(){
        val roleManager = getSystemService(ROLE_SERVICE) as RoleManager
        val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER)
        startActivityForResult(intent, REQUEST_ID)
    }

    @Deprecated("Deprecated in Java")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode == REQUEST_ID){
            if(resultCode == RESULT_OK){
                Log.d("Activity", "App is now dialer")
            }
            else{
                Log.e("Activity", "App is not dialer")
            }
        }
    }
}