import { Component, ElementRef, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Imesbouteilles } from '../imesbouteilles';
import { environment } from '../../environments/environment';
import { FetchService } from '../fetch.service';
import { Router } from '@angular/router';
import Quagga from 'quagga';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnDestroy {
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  isScanning = false;
  backCameraList = [];
  uneBouteille: Imesbouteilles;
  private stream: MediaStream | null = null;
  iconeCamera =  environment.baseImg + 'icones/barcode-scan.png';
  iconeX =  environment.baseImg + 'icones/x.png';
  hasEnvironmentCamera = false;
  
  // errorMessage: string = '';

  @Output() scanned = new EventEmitter<any>();
  showVideo = false;

  constructor(
    public fetchService: FetchService,
    private router: Router
    ) {
      // let inputStream = null;
    }


    ngOnInit(): void {
      // navigator.mediaDevices.enumerateDevices()
      //   .then((devices) => {
          
      //     devices.forEach((device) => {
      //       if (device.kind === 'videoinput') {
      //         console.log('Camera found:', device.label);
      //         if (device.label.includes('environment')) {
      //           this.hasEnvironmentCamera = true;
      //         }
      //       }
      //     });
          
      //   });
    }

    startScan(): void {
      // if (!this.hasEnvironmentCamera) {
      //   this.stopScan();
      //   this.showVideo = false;
      // }
      this.showVideo = true;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
          .then((stream) => {
            this.stream = stream;
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.autoplay = true;
            this.video.nativeElement.playsInline = true;
            this.video.nativeElement.muted = true;
            this.isScanning = true;
            Quagga.init({
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: this.video.nativeElement,
  
                constraints: {
                  width: 640,
                  height: 480,
                  facingMode: { exact: "environment" }
                },
                area: {
                  top: "25%",
                  right: "10%",
                  left: "10%",
                  bottom: "25%"
                },
                singleChannel: false // true: only the red color-channel is read
              },
              decoder: {
                readers: ["ean_reader", "upc_reader", "code_128_reader"]
              },
              locate: true,
              locator: {
                halfSample: false,
                patchSize: "large"
              },
              debug: true
            }, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              Quagga.start();
              this.isScanning = true;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  
    stopScan(): void {
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      this.showVideo = false;
      this.isScanning = false;
    }
  
  
      
    // startScan(): void {
    //   this.showVideo = true;
    //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices.getUserMedia({video: { facingMode: { exact: 'environment' } } })
    //       .then((stream) => {
    //         this.stream = stream;
    //         this.video.nativeElement.srcObject = stream;
    //         this.video.nativeElement.autoplay = true;
    //         this.video.nativeElement.playsInline = true;
    //         this.video.nativeElement.muted = true;
    //         this.isScanning = true;
    //         Quagga.init({
    //           inputStream: {
    //             name: "Live",
    //             type: "LiveStream",
    //             target: this.video.nativeElement,
                
    //             constraints: {
    //               width: 640,
    //               height: 480,
    //               facingMode: { exact: "environment" }
    //             },
    //             area: {
    //               top: "25%",
    //               right: "10%",
    //               left: "10%",
    //               bottom: "25%"
    //             },
    //             singleChannel: false // true: only the red color-channel is read
    //           },
    //           decoder: {
    //             readers: ["ean_reader", "upc_reader","code_128_reader"]
    //           },
    //           locate: true,
    //           locator: {
    //             halfSample: false,
    //             patchSize: "large"
    //           },
    //           debug:true
    //         }, (err) => {
    //           if (err) {
    //             console.error(err);
    //             return;
    //           }
    //           Quagga.start();
    //           this.isScanning = true;
    //         });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   }
    // }

    // stopScan(): void {
    //   if (this.stream) {
    //     this.stream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //     this.stream = null;
    //   }
    //   if (this.video && this.video.nativeElement) {
    //     this.video.nativeElement.pause();
    //     this.video.nativeElement.srcObject = null;
    //   }
    //   if (Quagga) {
    //     Quagga.stop();
    //     Quagga.offProcessed();
    //     Quagga.offDetected();
    //   }
    //   this.isScanning = false;
    //   this.showVideo = false;
    // }
    
    
    // stopScan(): void {
    //   this.isScanning = false;
    //   this.showVideo = false;
    //   if (this.stream) {
    //     this.stream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    //   if (this.video && this.video.nativeElement) {
    //         this.video.nativeElement.pause();
    //         this.video.nativeElement.srcObject = null;
    //       }
    //   Quagga.stop();
    // }
    
    ngOnDestroy(): void {
      this.stopScan();
    }

    // ngOnInit(): void {
    //   navigator.mediaDevices.enumerateDevices()
    //     .then((devices) => {
    //       devices.forEach((device) => {
    //         if (device.kind === 'videoinput') {
    //           console.log('Camera found:', device.label);
    //         }
    //       });
    //     });
    // }
    
    // startScan(): void {
    //   this.showVideo = true;
    //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     navigator.mediaDevices.getUserMedia({video: { facingMode: { exact: 'environment' } } })
    //       .then((stream) => {
    //         this.stream = stream;
    //         this.video.nativeElement.srcObject = stream;
    //         this.video.nativeElement.play();
    //         this.isScanning = true;
    //         Quagga.init({
    //           inputStream: {
    //             name: "Live",
    //             type: "LiveStream",
    //             target: this.video.nativeElement,
    //             constraints: {
    //               facingMode: { exact: "environment" }
    //             },
    //             area: {
    //               top: "25%",
    //               right: "10%",
    //               left: "10%",
    //               bottom: "25%"
    //             },
    //             singleChannel: false // true: only the red color-channel is read
    //           },
    //           decoder: {
    //             readers: ["ean_reader", "upc_reader","code_128_reader"]
    //           },
    //           locate: true,
    //           locator: {
    //             halfSample: false,
    //             patchSize: "large"
    //           },
    //           debug:true
    //         }, (err) => {
    //           if (err) {
    //             console.error(err);
    //             return;
    //           }
    //           Quagga.start();
    //           this.isScanning = true;
    //         });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   }
    // }
  
    // stopScan(): void {
    //   if (this.stream) {
    //     this.stream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   }
    //   this.video.nativeElement.pause();
    //   this.video.nativeElement.srcObject = null;
    //   Quagga.stop();
    //   this.isScanning = false;
    //   this.showVideo = false;
    // }
  
    // ngOnDestroy(): void {
    //   this.stopScan();
    // }
  


  handleDecode(result: any): void {

    console.log(result.codeResult.code);


    if(result.codeResult.code.length === 11){
      result.codeResult.code = "000"+result.codeResult.code
      console.log("ce code est 11");
      console.log(result.codeResult.code);
    }
    if(result.codeResult.code.length === 12){
      result.codeResult.code = "00"+result.codeResult.code
      console.log("ce code est 12");
      console.log(result.codeResult.code);
    }
    if(result.codeResult.code.length === 13){
      result.codeResult.code = "0"+result.codeResult.code
      console.log("ce code est 13");
      console.log(result.codeResult.code);
    }
    this.stopScan();


    
    this.fetchService.scannerDetail(result.codeResult.code).subscribe((data: any) => {
      this.uneBouteille = data.data;

      console.log(this.uneBouteille);

      this.scanned.emit(this.uneBouteille);

     
    });



  }

  ngAfterViewInit(): void {
    Quagga.onDetected(this.handleDecode.bind(this));
  }


  
}
