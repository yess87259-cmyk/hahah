import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUploadCSV } from "@/hooks/use-traffic-data";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Info, Cloud, Zap } from "lucide-react";

export default function CSVUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadCSV();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv' && file.type !== 'application/csv') {
      return { valid: false, error: "Please select a CSV file" };
    }
    
    if (file.size > 50 * 1024 * 1024) {
      return { valid: false, error: "File size must be less than 50MB" };
    }
    
    if (file.size === 0) {
      return { valid: false, error: "File cannot be empty" };
    }
    
    return { valid: true };
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validation = validateFile(file);
      if (validation.valid) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFile(file);
      if (validation.valid) {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploadProgress(0);
    
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      await uploadMutation.mutateAsync(selectedFile);
      setUploadProgress(100);
      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-2xl" data-testid="csv-upload-card">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Cloud className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Upload Traffic Data
        </CardTitle>
        <CardDescription className="text-gray-600">
          Upload your CSV file for high-accuracy ML analysis and real-time insights
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Format Instructions */}
        <Alert className="border-blue-200 bg-blue-50" data-testid="format-instructions">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Required CSV columns:</strong> Date, Hour, Location, Queue_Density (or Queue), 
            Stop_Density (or StopDensity), Accidents_Reported (or Accidents), Fatalities
          </AlertDescription>
        </Alert>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 scale-105' 
              : selectedFile 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          data-testid="upload-drop-zone"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv,application/csv"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            data-testid="file-input"
          />
          
          {!selectedFile ? (
            <div className="space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                dragActive ? 'bg-blue-600 scale-110' : 'bg-gray-100'
              }`}>
                <Upload className={`w-8 h-8 ${dragActive ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">
                  {dragActive ? "Drop your CSV file here" : "Drag and drop your CSV file"}
                </p>
                <p className="text-gray-600">
                  or <span className="text-blue-600 font-medium cursor-pointer hover:underline">click to browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  Maximum file size: 50MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-green-700" data-testid="selected-filename">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-600" data-testid="selected-filesize">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Ready
                </Badge>
              </div>
              
              {uploadProgress > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-gray-700">Upload Progress</span>
                    <span className="text-blue-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-3 bg-gray-200" data-testid="upload-progress" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {selectedFile && (
          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={uploadMutation.isPending || uploadProgress > 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="button-upload"
            >
              {uploadMutation.isPending || uploadProgress > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {uploadProgress < 90 ? "Uploading..." : "Processing..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Upload & Analyze
                </div>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={uploadMutation.isPending || uploadProgress > 0}
              className="px-6 border-2 border-gray-300 hover:border-red-400 hover:text-red-600 rounded-xl transition-all duration-300"
              data-testid="button-clear"
            >
              Clear
            </Button>
          </div>
        )}

        {/* Status Messages */}
        {uploadMutation.isError && (
          <Alert className="border-red-200 bg-red-50 animate-fade-in" data-testid="upload-error">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Upload failed:</strong> {uploadMutation.error instanceof Error ? uploadMutation.error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}
        
        {uploadMutation.isSuccess && uploadProgress === 100 && (
          <Alert className="border-green-200 bg-green-50 animate-fade-in" data-testid="upload-success">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Success!</strong> Your CSV file has been processed with ML models. 
              The dashboard will update automatically with new insights.
            </AlertDescription>
          </Alert>
        )}
        
        {uploadMutation.isPending && uploadProgress >= 90 && (
          <Alert className="border-blue-200 bg-blue-50 animate-fade-in" data-testid="processing-status">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Processing:</strong> Running high-accuracy Python ML analysis on your data. 
              This may take a few moments...
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}