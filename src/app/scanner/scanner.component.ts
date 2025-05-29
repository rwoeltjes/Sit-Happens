import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
  imports: [CommonModule, FormsModule, ZXingScannerModule ]
})
export class ScannerComponent implements OnInit {
  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | null = null;
  scanResult: string | null = null;
  torchCompatible = false;
  torchEnabled = false;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization logic
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (devices.length > 0) {
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      this.selectedDevice = videoDevices[0] || null;
    }
  }

  onCodeResult(resultString: string): void {
    this.scanResult = resultString;
  }

  onScanError(error: Error): void {
    console.error('Scan Error:', error);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
